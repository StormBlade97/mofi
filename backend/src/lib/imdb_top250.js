import { shuffle } from 'lodash';

const top250 = [
  "0111161",
  "0068646",
  "0071562",
  "0468569",
  "0050083",
  "0108052",
  "0110912",
  "0167260",
  "0060196",
  "0137523",
  "0120737",
  "0109830",
  "0080684",
  "1375666",
  "0167261",
  "0073486",
  "0099685",
  "0133093",
  "0047478",
  "0076759",
  "0317248",
  "0114369",
  "0102926",
  "0038650",
  "0118799",
  "0114814",
  "0110413",
  "0120815",
  "0245429",
  "0120586",
  "0064116",
  "0816692",
  "0120689",
  "0054215",
  "0034583",
  "0021749",
  "1675434",
  "0027977",
  "0082971",
  "0253474",
  "0407887",
  "0047396",
  "0103064",
  "0088763",
  "2582802",
  "0172495",
  "0482571",
  "0110357",
  "0209144",
  "0078788",
  "0078748",
  "0032553",
  "0043014",
  "0057012",
  "0095765",
  "0405094",
  "0095327",
  "0050825",
  "1853728",
  "0081505",
  "0910970",
  "0169547",
  "1856101",
  "1345836",
  "0119698",
  "0364569",
  "0090605",
  "0051201",
  "0087843",
  "0082096",
  "5074352",
  "0033467",
  "0052357",
  "0053125",
  "0086190",
  "0112573",
  "0105236",
  "0022100",
  "0180093",
  "0211915",
  "0986264",
  "5311514",
  "0066921",
  "0056172",
  "0036775",
  "0086879",
  "0338013",
  "0075314",
  "0056592",
  "0093058",
  "0062622",
  "0045152",
  "0114709",
  "1187043",
  "0070735",
  "0435761",
  "0361748",
  "0040522",
  "5013056",
  "0012349",
  "0208092",
  "0071853",
  "0119217",
  "2106476",
  "0059578",
  "0119488",
  "0086250",
  "0053604",
  "0017136",
  "1832382",
  "0042876",
  "0097576",
  "0042192",
  "0055630",
  "0476735",
  "1049413",
  "0372784",
  "0053291",
  "0040897",
  "0105695",
  "0363163",
  "0095016",
  "0081398",
  "0113277",
  "0118849",
  "0041959",
  "0057115",
  "0044741",
  "0071315",
  "0457430",
  "0096283",
  "1255953",
  "0089881",
  "0055031",
  "0015864",
  "1305806",
  "2096673",
  "0347149",
  "0047296",
  "0050212",
  "3170832",
  "0050976",
  "0120735",
  "0031679",
  "0268978",
  "0112641",
  "0083658",
  "0080678",
  "0434409",
  "0050986",
  "0993846",
  "0017925",
  "1291584",
  "0046912",
  "0117951",
  "1205489",
  "0031381",
  "0018455",
  "0077416",
  "0167404",
  "0116282",
  "0060107",
  "0084787",
  "0477348",
  "0118715",
  "0266543",
  "0046438",
  "0116231",
  "0469494",
  "0061512",
  "0091251",
  "0032976",
  "2119532",
  "0266697",
  "0892769",
  "0405508",
  "0019254",
  "2267998",
  "0978762",
  "3783958",
  "1130884",
  "0758758",
  "0025316",
  "0079470",
  "3315342",
  "3011894",
  "0091763",
  "0046268",
  "0395169",
  "0074958",
  "0107207",
  "1979320",
  "1280558",
  "0092005",
  "3501632",
  "0060827",
  "0052618",
  "2278388",
  "0053198",
  "0353969",
  "0107290",
  "2024544",
  "1392190",
  "0405159",
  "1895587",
  "0079944",
  "0120382",
  "0064115",
  "0245712",
  "1028532",
  "0087544",
  "0033870",
  "0093779",
  "0112471",
  "0070510",
  "0050783",
  "1392214",
  "1201607",
  "0032551",
  "0075148",
  "0264464",
  "0052311",
  "0046911",
  "0083987",
  "0198781",
  "0246578",
  "0072684",
  "0075686",
  "0088247",
  "2488496",
  "0440963",
  "0032138",
  "0374887",
  "0107048",
  "0113247",
  "0056801",
  "0073195",
  "0036868",
  "0114746",
  "0338564",
  "1454029",
  "0118694",
  "0087884",
  "4016934",
  "0101414",
  "0058946",
  "0097165",
  "0325980",
  "0072890",
  "1954470",
]

const digestTop250 = () => shuffle([...top250].map(movie_id => ({ movie_id: "tt" + movie_id, count: 0 })))

export { digestTop250 }

export default top250;