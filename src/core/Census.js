import Format from 'nonstate/atoms/Format.js';

export function getCensusLabel(tableName) {
  return Format.titleCase(
      tableName
        .replace('population', '')
        .replace('regions', '')
        .replace('2012', '')
        .replace('social-household', '')
        .replace('social', '')
        .split(/[-.]+/)
        .join(' ')
        
  );
}