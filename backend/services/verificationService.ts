import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { VerificationReport } from '../models/analysis.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, '../data');

function loadJson<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataPath, fileName), 'utf8')) as T;
}

export async function verifyBroker({
  name,
  registrationNumber,
}: {
  name?: string;
  registrationNumber?: string;
}): Promise<VerificationReport> {
  const cleanName = (name ?? '').trim().toLowerCase();
  const cleanReg = (registrationNumber ?? '').trim().toLowerCase();

  if (!cleanName && !cleanReg) {
    return {
      status: 'UNABLE_TO_VERIFY',
      source: 'No official source available',
      summary: 'No entity name or registration number was provided for automated verification.',
      details: ['Unable to verify because the submission did not provide an official identifier.'],
    };
  }

  const entities = loadJson<Array<{ name: string; registrationNumber: string; entityType: string; status: string; officialSource: string }>>('financialEntities.json');
  const target = entities.find((entity) => {
    const regMatch = cleanReg && entity.registrationNumber.toLowerCase() === cleanReg;
    const nameMatch = cleanName && (entity.name.toLowerCase().includes(cleanName) || cleanName.includes(entity.name.toLowerCase()));
    if (cleanReg && cleanName) return regMatch || nameMatch;
    if (cleanReg) return regMatch;
    if (cleanName) return nameMatch;
    return false;
  });

  if (target) {
    return {
      status: 'VERIFIED',
      source: target.officialSource,
      entity: target.name,
      registrationNumber: target.registrationNumber,
      summary: `${target.name} matches a known public entity record.`,
      details: [`Verified against official or authoritative public source: ${target.officialSource}`],
    };
  }

  return {
    status: 'UNABLE_TO_VERIFY',
    source: 'Manual official registry review required',
    summary: 'The submitted entity or registration number could not be confirmed automatically from the available public registry data.',
    details: ['No authoritative match was found in the configured public registry dataset.', 'The system deliberately does not treat this as proof of fraud.'],
  };
}

export async function verifyDomain(url: string): Promise<VerificationReport> {
  try {
    const trimmed = (url ?? '').trim();
    if (!trimmed) {
      return {
        status: 'UNABLE_TO_VERIFY',
        source: 'No URL provided',
        summary: 'No domain or URL was provided.',
        details: ['Empty submission.'],
      };
    }
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    const hostname = parsed.hostname.replace(/^www\./i, '').toLowerCase();
    const domains = loadJson<Array<{ domain: string; category: string; entity: string; status: string; source: string }>>('knownDomains.json');
    const match = domains.find((item) => item.domain.toLowerCase() === hostname || hostname.endsWith(`.${item.domain.toLowerCase()}`));

    if (match) {
      return {
        status: match.status === 'SUSPICIOUS' ? 'SUSPICIOUS' : 'VERIFIED',
        source: match.source,
        summary: `${hostname} is listed in the known domain registry for ${match.category}.`,
        details: [`Known validity: ${match.status}`, `Category: ${match.category}`],
      };
    }

    return {
      status: 'UNKNOWN',
      source: 'Public domain registry unavailable',
      summary: 'The domain is not in the known list and therefore remains unknown rather than being labeled malicious.',
      details: ['The system does not classify unknown domains as malicious without authoritative evidence.'],
    };
  } catch {
    return {
      status: 'UNABLE_TO_VERIFY',
      source: 'Invalid URL format',
      summary: 'The URL submitted could not be parsed for verification.',
      details: ['The URL format is invalid or empty.'],
    };
  }
}

export async function verifyEntity(name?: string): Promise<VerificationReport> {
  const clean = (name ?? '').trim();
  if (!clean) {
    return {
      status: 'UNABLE_TO_VERIFY',
      source: 'No entity name provided',
      summary: 'No entity name was supplied for verification.',
      details: ['Manual review is required before relying on the claimed institution.'],
    };
  }

  const entities = loadJson<Array<{ name: string; registrationNumber: string; entityType: string; status: string; officialSource: string }>>('financialEntities.json');
  const match = entities.find((entity) => entity.name.toLowerCase().includes(clean.toLowerCase()));

  if (match) {
    return {
      status: 'VERIFIED',
      source: match.officialSource,
      entity: match.name,
      summary: `${match.name} is present in the public registry dataset.`,
      details: [`Entity type: ${match.entityType}`, `Official source: ${match.officialSource}`],
    };
  }

  return {
    status: 'UNABLE_TO_VERIFY',
    source: 'Authoritative registry not available',
    summary: 'This entity could not be confirmed automatically from the available public records.',
    details: ['The platform intentionally avoids branding unknown entities as fraudulent.'],
  };
}
