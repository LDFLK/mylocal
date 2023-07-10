export const CENSUS_TABLE_GROUPS = {
  'Demographic Information': [
    'population-gender.regions.2012',
    'population-age_group.regions.2012',
    'population-marital_status.regions.2012',
  ],
  'Ethno-Religious Information': [
    'population-ethnicity.regions.2012',
    'population-religion.regions.2012',
  ],
  'Household Information': [
    'social-household-lighting.regions.2012',
    'social-household-cooking_fuel.regions.2012',

    'social-household-source_of_drinking_water.regions.2012',
    'social-household-solid_waste_disposal.regions.2012',
    'social-household-toilet_facilities.regions.2012',

    'social-household-roof_type.regions.2012',
    'social-household-floor_type.regions.2012',
    'social-household-wall_type.regions.2012',
    'social-household-structure.regions.2012',

    'social-household-living_quarters.regions.2012',
    'social-household-type_of_unit.regions.2012',
    'social-household-occupation_status.regions.2012',
    'social-household-year_of_construction.regions.2012',

    'social-household-number_of_rooms.regions.2012',
    'social-household-number_of_persons.regions.2012',
    'social-household-relationship_to_head.regions.2012',
    'social-household-number-of-households.regions.2012',
    'social-household-ownership-status.regions.2012',
  ],
  
};


// export const CENSUS_TABLE_GROUPS = {
//   'Demographic Information': [
//     'gender_of_population',
//     'age_group_of_population',
//     'marital_status_of_population',
//   ],
//   'Household Information': [
//     'communication_items_owned_by_household',
//     'lighting_of_household',
//     'cooking_fuel_of_household',

//     'source_of_drinking_water_of_household',
//     'solid_waste_disposal_by_household',
//     'toilet_facilities_of_household',

//     'roof_type_in_housing_unit',
//     'floor_type_in_housing_unit',
//     'wall_type_in_housing_units',
//     'structure_of_housing_units',

//     'living_quarters',
//     'type_of_housing_unit',
//     'occupation_status_of_housing_units',
//     'year_of_construction_of_housing_unit',

//     'rooms_in_housing_unit',
//     'persons_living_in_housing_unit',
//     'relationship_to_household_head_of_population',
//     'households_living_in_housing_unit',
//     'housing_ownership_status_of_household',
//   ],
//   'Ethno-Religious Information': [
//     'ethnicity_of_population',
//     'religious_affiliation_of_population',
//   ],
// };

export const CENSUS_TABLE_SPAN_INFO = {
  'population-age_group.regions.2012': [
    ['less_than_10', 10],
    ['10_~_19', 10],
    ['20_~_29', 10],
    ['30_~_39', 10],
    ['40_~_49', 10],
    ['50_~_59', 10],
    ['60_~_69', 10],
    ['70_~_79', 10],
    ['80_~_89', 10],
    ['90_and_above', 10],
  ],
  'social-household-year_of_construction.regions.2012': [
    ['before_80', 25],
    ['1980_1989', 10],
    ['1990_1994', 5],
    ['1995_1999', 5],
    ['2000_2004', 5],
    ['2005', 1],
    ['2006', 1],
    ['2007', 1],
    ['2008', 1],
    ['2009', 1],
    ['2010', 1],
    ['2011', 1],
  ],
  'social-household-number_of_rooms.regions.2012': [
    ['1_room', 1],
    ['2_rooms', 1],
    ['3_rooms', 1],
    ['4_rooms', 1],
    ['5_rooms', 1],
    ['6_rooms', 1],
    ['7_rooms', 1],
    ['8_rooms', 1],
    ['9_rooms', 1],
    ['10_and_above', 1],
  ],

  'social-household-number_of_persons.regions.2012': [
    ['1_person', 1],
    ['2_persons', 1],
    ['3_persons', 1],
    ['4_persons', 1],
    ['5_persons', 1],
    ['6_persons', 1],
    ['7_persons', 1],
    ['8_persons', 1],
    ['9_persons', 1],
    ['10_or_more', 1],
  ],
  'social-household-number-of-households.regions.2012': [
    ['1_household', 1],
    ['2_households', 1],
    ['3_households', 1],
    ['4_households', 1],
    ['5_or_more', 1],
  ]
}
