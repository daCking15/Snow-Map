// US ski resorts - loaded from north-american-ski-resorts dataset
// Pass: Epic, Ikon, Indy, Independent (default)
const RESORTS_CSV_URL = 'https://raw.githubusercontent.com/bryanparthum/north-american-ski-resorts/main/data/north_american_resorts.csv';

// Colorado Ikon resorts not listed separately in the CSV (Aspen Snowmass is one entry)
const SUPPLEMENTAL_CO_RESORTS = [
  { name: 'Aspen Mountain', slug: 'aspen-mountain', lat: 39.1911, lng: -106.8175, state: 'Colorado', pass: 'Ikon' },
  { name: 'Aspen Highlands', slug: 'aspen-highlands', lat: 39.1833, lng: -106.8500, state: 'Colorado', pass: 'Ikon' },
  { name: 'Buttermilk', slug: 'buttermilk', lat: 39.2000, lng: -106.8500, state: 'Colorado', pass: 'Ikon' },
  { name: 'Snowmass', slug: 'snowmass', lat: 39.2133, lng: -106.9378, state: 'Colorado', pass: 'Ikon' },
];

const REGION_TO_STATE = {
  alabama: 'Alabama', alaska: 'Alaska', arizona: 'Arizona', california: 'California',
  colorado: 'Colorado', connecticut: 'Connecticut', idaho: 'Idaho', illinois: 'Illinois',
  indiana: 'Indiana', iowa: 'Iowa', maine: 'Maine', maryland: 'Maryland',
  massachusetts: 'Massachusetts', michigan: 'Michigan', minnesota: 'Minnesota',
  missouri: 'Missouri', montana: 'Montana', nevada: 'Nevada', 'new-hampshire': 'New Hampshire',
  'new-jersey': 'New Jersey', 'new-mexico': 'New Mexico', 'new-york': 'New York',
  'north-carolina': 'North Carolina', ohio: 'Ohio', oregon: 'Oregon', pennsylvania: 'Pennsylvania',
  'rhode-island': 'Rhode Island', 'south-dakota': 'South Dakota', tennessee: 'Tennessee',
  utah: 'Utah', vermont: 'Vermont', virginia: 'Virginia', washington: 'Washington',
  'west-virginia': 'West Virginia', wisconsin: 'Wisconsin', wyoming: 'Wyoming',
};

// Official website domains for favicon/logo (slug -> domain). Fallback to mountain icon if not mapped.
const WEBSITE_MAP = {
  '49-degrees-north': 'ski49n.com', 'alta-ski-area': 'alta.com', 'arapahoe-basin-ski-area': 'arapahoebasin.com',
  'aspen-mountain': 'aspensnowmass.com', 'aspen-highlands': 'aspensnowmass.com', 'attitash': 'attitash.com',
  'beaver-creek': 'beavercreek.com', 'big-sky-resort': 'bigskyresort.com', 'breckenridge': 'breckenridge.com',
  'brighton-resort': 'brightonresort.com', 'copper-mountain-resort': 'coppercolorado.com',
  'crested-butte-mountain-resort': 'skicb.com', 'deer-valley-resort': 'deervalley.com',
  'durango-mountain-resort': 'purgatoryresort.com', 'eldora-mountain-resort': 'eldora.com',
  'heavenly-mountain-resort': 'skiheavenly.com', 'jackson-hole': 'jacksonhole.com',
  'jay-peak': 'jaypeakresort.com', 'keystone': 'keystoneresort.com', 'killington-resort': 'killington.com',
  'kirkwood': 'kirkwood.com', 'loon-mountain': 'loonmtn.com', 'loveland': 'skiloveland.com',
  'mammoth-mountain-ski-area': 'mammothmountain.com', 'monarch-mountain': 'skimonarch.com',
  'mount-snow': 'mountsnow.com', 'northstar-california': 'northstarcalifornia.com',
  'okemo-mountain-resort': 'okemo.com', 'park-city-mountain-resort': 'parkcitymountain.com',
  'pico-mountain-at-killington': 'killington.com', 'powderhorn': 'powderhorn.com',
  'snowbird': 'snowbird.com', 'snowmass': 'aspensnowmass.com', 'steamboat': 'steamboat.com',
  'stowe-mountain-resort': 'stowe.com', 'stratton-mountain-resort': 'stratton.com',
  'sugarbush-resort': 'sugarbush.com', 'sugarloaf': 'sugarloaf.com', 'sunday-river': 'sundayriver.com',
  'sunlight-mountain-resort': 'sunlightmtn.com', 'vail': 'vail.com',
  'winter-park-resort': 'winterparkresort.com', 'buttermilk': 'aspensnowmass.com',
  // Additional popular resorts
  'mt-bachelor': 'mtbachelor.com', 'mt-baker': 'mtbakerskiarea.com', 'crystal-mountain-wa': 'crystalmountainresort.com',
  'stevens-pass': 'stevenspass.com', 'taos-ski-valley': 'skitaos.com', 'angel-fire-resort': 'angelfireresort.com',
  'telluride': 'telluride.com', 'wolf-creek': 'wolfcreekski.com', 'sun-valley': 'sunvalley.com',
  'grand-targhee-resort': 'grandtarghee.com', 'bogus-basin': 'bogusbasin.org',
  'mt-hood-meadows': 'skihood.com', 'mt-hood-ski-bowl': 'skibowl.com',
  'squaw-valley': 'palisadestahoe.com', 'palisades-tahoe': 'palisadestahoe.com',
  'sugar-bowl': 'sugarbowl.com', 'sierra-at-tahoe': 'sierraattahoe.com', 'boreal': 'borealski.com',
  'snowbasin': 'snowbasin.com', 'powder-mountain': 'powdermountain.com', 'sundance': 'sundanceresort.com',
  'brian-head-resort': 'brianhead.com', 'solitude-mountain-resort': 'solitudemountain.com',
  'snowshoe': 'snowshoemtn.com', 'canaan-valley-resort': 'canaanresort.com',
  'boyne-mountain-resort': 'boynemountain.com', 'boyne-highlands': 'boynehighlands.com',
  'lutsen-mountains': 'lutsen.com', 'spirit-mountain': 'spiritmt.com', 'granite-peak-ski-area': 'granitepeak.com',
};

// Major resorts pass affiliations (Epic, Ikon, Indy) - others default to Independent
const PASS_MAP = {
  'arapahoe-basin-ski-area': 'Ikon', 'aspen-snowmass': 'Ikon', 'attitash': 'Epic',
  'beaver-creek': 'Epic', 'breckenridge': 'Epic', 'copper-mountain-resort': 'Ikon',
  'crested-butte-mountain-resort': 'Epic', 'eldora-mountain-resort': 'Ikon',
  'granby-ranch': 'Indy', 'howelsen-hill': 'Indy', 'keystone': 'Epic',
  'loveland': 'Indy', 'monarch-mountain': 'Independent', 'powderhorn': 'Indy',
  'durango-mountain-resort': 'Independent', 'sunlight': 'Indy', 'sunlight-mountain-resort': 'Indy', 'vail': 'Epic',
  'winter-park': 'Ikon', 'winter-park-resort': 'Ikon', 'steamboat': 'Ikon', 'snowmass': 'Ikon',
  'sugarloaf': 'Independent', 'sunday-river': 'Independent', 'killington-resort': 'Ikon',
  'pico-mountain-at-killington': 'Ikon', 'stowe-mountain-resort': 'Ikon',
  'sugarbush-resort': 'Ikon', 'stratton-mountain-resort': 'Ikon', 'okemo-mountain-resort': 'Epic',
  'mount-snow': 'Epic', 'loon-mountain': 'Epic', 'jay-peak': 'Ikon',
  'heavenly-mountain-resort': 'Epic', 'kirkwood': 'Epic', 'northstar-california': 'Epic',
  'park-city-mountain-resort': 'Epic', 'alta-ski-area': 'Ikon', 'brighton-resort': 'Ikon',
  'deer-valley-resort': 'Ikon', 'snowbird': 'Ikon', 'jackson-hole': 'Ikon',
  'big-sky-resort': 'Ikon', 'mammoth-mountain-ski-area': 'Ikon',
};

function formatResortName(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function loadUSResorts() {
  const res = await fetch(RESORTS_CSV_URL);
  const text = await res.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  const resorts = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 5) continue;

    const resortSlug = (values[0] || '').toLowerCase().replace(/\s+/g, '-');
    const region = (values[1] || '').toLowerCase();
    const country = (values[2] || '').toLowerCase();
    const lat = parseFloat(values[3]);
    const lng = parseFloat(values[4]);

    if (country !== 'usa' || isNaN(lat) || isNaN(lng)) continue;

    // Skip aspen-snowmass - we add Aspen Mountain, Highlands, Buttermilk, Snowmass separately
    if (resortSlug === 'aspen-snowmass') continue;

    const state = REGION_TO_STATE[region] || region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const pass = PASS_MAP[resortSlug] || 'Independent';

    resorts.push({
      name: formatResortName(values[0]),
      slug: resortSlug,
      lat, lng, state, pass
    });
  }

  // Add supplemental resorts (e.g. Aspen mountains - CSV has aspen-snowmass as single entry)
  resorts.push(...SUPPLEMENTAL_CO_RESORTS);

  return resorts;
}

// Social media handles for news/social sidebar (slug -> { website, twitter, instagram })
const SOCIAL_MAP = {
  'vail': { twitter: 'vailmtn', instagram: 'vailmtn' },
  'breckenridge': { twitter: 'breckenridgemtn', instagram: 'breckenridgemtn' },
  'keystone': { twitter: 'KeystoneMtn', instagram: 'keystonemountain' },
  'beaver-creek': { twitter: 'beavercreekmtn', instagram: 'beavercreek' },
  'park-city-mountain-resort': { twitter: 'PCski', instagram: 'parkcitymountain' },
  'crested-butte-mountain-resort': { twitter: 'CrestedButteMt', instagram: 'crestedbutteresort' },
  'heavenly-mountain-resort': { twitter: 'heavenlymtn', instagram: 'heavenlymtn' },
  'kirkwood': { twitter: 'KirkwoodMtn', instagram: 'kirkwoodmtn' },
  'northstar-california': { twitter: 'NorthstarMtn', instagram: 'northstarmtn' },
  'mount-snow': { twitter: 'mountsnow', instagram: 'mountsnow' },
  'okemo-mountain-resort': { twitter: 'okemomountain', instagram: 'okemomountain' },
  'stowe-mountain-resort': { twitter: 'StoweMountainRes', instagram: 'stowemountainresort' },
  'loon-mountain': { twitter: 'LoonMtn', instagram: 'loonmtn' },
  'jackson-hole': { twitter: 'jacksonhole', instagram: 'jacksonhole' },
  'big-sky-resort': { twitter: 'bigskyresort', instagram: 'bigskyresort' },
  'alta-ski-area': { twitter: 'AltaSkiArea', instagram: 'altaskiarea' },
  'snowbird': { twitter: 'Snowbird', instagram: 'snowbird' },
  'deer-valley-resort': { twitter: 'DeerValley', instagram: 'deervalley' },
  'brighton-resort': { twitter: 'BrightonResort', instagram: 'brightonresort' },
  'mammoth-mountain-ski-area': { twitter: 'MammothMountain', instagram: 'mammothmountain' },
  'winter-park-resort': { twitter: 'WinterPark', instagram: 'winterparkresort' },
  'steamboat': { twitter: 'SteamboatMtn', instagram: 'steamboatresort' },
  'copper-mountain-resort': { twitter: 'CopperMtn', instagram: 'coppermountain' },
  'eldora-mountain-resort': { twitter: 'eldoramtn', instagram: 'eldoramtn' },
  'arapahoe-basin-ski-area': { twitter: 'Arapahoe_Basin', instagram: 'arapahoebasin' },
  'loveland': { twitter: 'LovelandSkiArea', instagram: 'lovelandskarea' },
  'aspen-mountain': { twitter: 'aspensnowmass', instagram: 'aspensnowmass' },
  'snowmass': { twitter: 'aspensnowmass', instagram: 'aspensnowmass' },
  'aspen-highlands': { twitter: 'aspensnowmass', instagram: 'aspensnowmass' },
  'buttermilk': { twitter: 'aspensnowmass', instagram: 'aspensnowmass' },
  'killington-resort': { twitter: 'KillingtonMtn', instagram: 'killingtonresort' },
  'sugarbush-resort': { twitter: 'SugarbushVt', instagram: 'sugarbushresort' },
  'stratton-mountain-resort': { twitter: 'StrattonMountain', instagram: 'strattonmountain' },
  'jay-peak': { twitter: 'JayPeakResort', instagram: 'jaypeakresort' },
  'sugarloaf': { twitter: 'sugarloafmaine', instagram: 'sugarloafmaine' },
  'sunday-river': { twitter: 'sundayriver', instagram: 'sundayriver' },
  'mt-bachelor': { twitter: 'mtbachelor', instagram: 'mtbachelor' },
  'palisades-tahoe': { twitter: 'palisadestahoe', instagram: 'palisadestahoe' },
};

if (typeof window !== 'undefined') {
  window.WEBSITE_MAP = WEBSITE_MAP;
  window.SOCIAL_MAP = SOCIAL_MAP;
}

function parseCSVLine(line) {
  const result = [];
  let current = '', inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQuotes = !inQuotes; continue; }
    if (!inQuotes && c === ',') { result.push(current); current = ''; continue; }
    current += c;
  }
  result.push(current);
  return result;
}
