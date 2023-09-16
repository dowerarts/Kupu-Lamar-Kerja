
const fs = require('fs');
var fetch = require("node-fetch");
var chalk = require("chalk");
const readlineSync = require("readline-sync");
const colors = require("colors");

const date = () => new Date().toLocaleTimeString({
    timeZone: 'Asia/Jakarta'
});
const log = console.log;

const api = "https://kupu-encryptor.vercel.app/";

// proxy // 

function getCode(jenisJob, bearer, kodeId) {
  const index = fetch('https://api.kupu.id/position/position/searchJobs', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '65B12CA6F904B00274EC89F2AC90447F',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '339',
        'noncestr': 'bUiWKoFcPxwYzTZsAmcLXrPfWSPbLXWH',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30516875514425228688e7f78a44340457784b38753fe45c40efbf92a'
      },
      // body: '{"cityId":[3173,3175,3174,3171,3172],"filterTitle":1,"jobTitle":"it support","jobType":[],"lat":-6.3237554499941231,"lon":106.89996504683977,"pageNum":1,"pageSize":10000,"readId":"","recommendedUserPositions":["212004","205008","201004","208001"],"salaryUnits":[],"searchTime":"1687551970298","searchType":2,"skip":"","userPositions":[""]}',
      body: JSON.stringify({
        "cityId": [`${kodeId}`],
        'filterTitle': 1,
        'jobTitle': jenisJob,
        'jobType': [],
        'pageNum': 1,
        'pageSize': 10000,
        'readId': '',
        'salaryUnits': [],
        'searchType': 2,
        'skip': '',
        'userPositions': [
          ''
        ]
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function apply(jobId, bearer) {
  const index = fetch('https://api.kupu.id/position/applyJob/apply-job/v1/applyJob', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '5A6DA760F25E2C1A8BFAA66433E36F98',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '74',
        'noncestr': 'cJhxgdBEfHhfhYXUQKuqKIyjtrILrBig',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30516875514425228688e7f78a44340457784b38753fe45c40efbf92a'
      },
      body: JSON.stringify({
        'jobId': jobId,
        'paySelected': 0,
        'skipResumeComplete': false
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function getKotaKode(kota) {
  const data = `11|Aceh
  1101|Simeulue
  1102|Aceh Singkil
  1103|Aceh Selatan
  1104|Aceh Tenggara
  1105|Aceh Timur
  1106|Aceh Tengah
  1107|Aceh Barat
  1108|Aceh Besar
  1109|Pidie
  1110|Bireuen
  1111|Aceh Utara
  1112|Aceh Barat Daya
  1113|Gayo Lues
  1114|Aceh Tamiang
  1115|Nagan Raya
  1116|Aceh Jaya
  1117|Bener Meriah
  1118|Pidie Jaya
  1171|Banda Aceh
  1172|Sabang
  1173|Langsa
  1174|Lhokseumawe
  1175|Subulussalam
  |undefined
  12|Sumatera Utara
  1201|Nias
  1202|Mandailing Natal
  1203|Tapanuli Selatan
  1204|Tapanuli Tengah
  1205|Tapanuli Utara
  1206|Toba Samosir
  1207|Labuhan Batu
  1208|Asahan
  1209|Simalungun
  1210|Dairi
  1211|Karo
  1212|Deli Serdang
  1213|Langkat
  1214|Nias Selatan
  1215|Humbang Hasundutan
  1216|Pakpak Bharat
  1217|Samosir
  1218|Serdang Bedagai
  1219|Batu Bara
  1220|Padang Lawas Utara
  1221|Padang Lawas
  1222|Labuhan Batu Selatan
  1223|Labuhan Batu Utara
  1224|Nias Utara
  1225|Nias Barat
  1271|Sibolga
  1272|Tanjung Balai
  1273|Pematangsiantar
  1274|Tebing Tinggi
  1275|Medan
  1276|Binjai
  1277|Padang Sidempuan
  1278|Gunungsitoli
  |undefined
  13|Sumatera Barat
  1301|Kepulauan Mentawai
  1302|Pesisir Selatan
  1303|Solok
  1304|Sijunjung
  1305|Tanah Datar
  1306|Padang Pariaman
  1307|Agam
  1308|Lima Puluh Kota
  1309|Pasaman
  1310|Solok Selatan
  1311|Dharmasraya
  1312|Pasaman Barat
  1371|Padang
  1372|Solok
  1373|Sawah Lunto
  1374|Padang Panjang
  1375|Bukittinggi
  1376|Payakumbuh
  1377|Pariaman
  |undefined
  14|Riau
  1401|Kuantan Singingi
  1402|Indragiri Hulu
  1403|Indragiri Hilir
  1404|Pelalawan
  1405|Siak
  1406|Kampar
  1407|Rokan Hulu
  1408|Bengkalis
  1409|Rokan Hilir
  1410|Kepulauan Meranti
  1471|Pekanbaru
  1473|Dumai
  |undefined
  15|Jambi
  1501|Kerinci
  1502|Merangin
  1503|Sarolangun
  1504|Batang Hari
  1505|Muaro Jambi
  1506|Tanjung Jabung Timur
  1507|Tanjung Jabung Barat
  1508|Tebo
  1509|Bungo
  1571|Jambi
  1572|Sungai Penuh
  |undefined
  16|Sumatera Selatan
  1601|Ogan Komering Ulu
  1602|Ogan Komering Ilir
  1603|Muara Enim
  1604|Lahat
  1605|Musi Rawas
  1606|Musi Banyuasin
  1607|Banyu Asin
  1608|Ogan Komering Ulu Selatan
  1609|Ogan Komering Ulu Timur
  1610|Ogan Ilir
  1611|Empat Lawang
  1612|Penukal Abab Lematang Ilir
  1613|Musi Rawas Utara
  1671|Palembang
  1672|Prabumulih
  1673|Pagar Alam
  1674|Lubuklinggau
  |undefined
  17|Bengkulu
  1701|Bengkulu Selatan
  1702|Rejang Lebong
  1703|Bengkulu Utara
  1704|Kaur
  1705|Seluma
  1706|Mukomuko
  1707|Lebong
  1708|Kepahiang
  1709|Bengkulu Tengah
  1771|Bengkulu
  |undefined
  18|Lampung
  1801|Lampung Barat
  1802|Tanggamus
  1803|Lampung Selatan
  1804|Lampung Timur
  1805|Lampung Tengah
  1806|Lampung Utara
  1807|Way Kanan
  1808|Tulangbawang
  1809|Pesawaran
  1810|Pringsewu
  1811|Mesuji
  1812|Tulang Bawang Barat
  1813|Pesisir Barat
  1871|Bandar Lampung
  1872|Metro
  |undefined
  19|Kepulauan Bangka Belitung
  1901|Bangka
  1902|Belitung
  1903|Bangka Barat
  1904|Bangka Tengah
  1905|Bangka Selatan
  1906|Belitung Timur
  1971|Pangkalpinang
  |undefined
  21|Kepulauan Riau
  2101|Karimun
  2102|Bintan
  2103|Natuna
  2104|Lingga
  2105|Kepulauan Anambas
  2171|Batam
  2172|Tanjung Pinang
  |undefined
  31|DKI Jakarta
  3101|Kepulauan Seribu
  3171|Jakarta Selatan
  3172|Jakarta Timur
  3173|Jakarta Pusat
  3174|Jakarta Barat
  3175|Jakarta Utara
  |undefined
  32|Jawa Barat
  3201|Bogor
  3202|Sukabumi
  3203|Cianjur
  3204|Bandung
  3205|Garut
  3206|Tasikmalaya
  3207|Ciamis
  3208|Kuningan
  3209|Cirebon
  3210|Majalengka
  3211|Sumedang
  3212|Indramayu
  3213|Subang
  3214|Purwakarta
  3215|Karawang
  3216|Bekasi
  3217|Bandung Barat
  3218|Pangandaran
  3271|Bogor
  3272|Sukabumi
  3273|Bandung
  3274|Cirebon
  3275|Bekasi
  3276|Depok
  3277|Cimahi
  3278|Tasikmalaya
  3279|Banjar
  |undefined
  33|Jawa Tengah
  3301|Cilacap
  3302|Banyumas
  3303|Purbalingga
  3304|Banjarnegara
  3305|Kebumen
  3306|Purworejo
  3307|Wonosobo
  3308|Magelang
  3309|Boyolali
  3310|Klaten
  3311|Sukoharjo
  3312|Wonogiri
  3313|Karanganyar
  3314|Sragen
  3315|Grobogan
  3316|Blora
  3317|Rembang
  3318|Pati
  3319|Kudus
  3320|Jepara
  3321|Demak
  3322|Semarang
  3323|Temanggung
  3324|Kendal
  3325|Batang
  3326|Pekalongan
  3327|Pemalang
  3328|Tegal
  3329|Brebes
  3371|Magelang
  3372|Surakarta
  3373|Salatiga
  3374|Semarang
  3375|Pekalongan
  3376|Tegal
  |undefined
  34|DI Yogyakarta
  3401|Kulon Progo
  3402|Bantul
  3403|Gunung Kidul
  3404|Sleman
  3471|Yogyakarta
  |undefined
  35|Jawa Timur
  3501|Pacitan
  3502|Ponorogo
  3503|Trenggalek
  3504|Tulungagung
  3505|Blitar
  3506|Kediri
  3507|Malang
  3508|Lumajang
  3509|Jember
  3510|Banyuwangi
  3511|Bondowoso
  3512|Situbondo
  3513|Probolinggo
  3514|Pasuruan
  3515|Sidoarjo
  3516|Mojokerto
  3517|Jombang
  3518|Nganjuk
  3519|Madiun
  3520|Magetan
  3521|Ngawi
  3522|Bojonegoro
  3523|Tuban
  3524|Lamongan
  3525|Gresik
  3526|Bangkalan
  3527|Sampang
  3528|Pamekasan
  3529|Sumenep
  3571|Kediri
  3572|Blitar
  3573|Malang
  3574|Probolinggo
  3575|Pasuruan
  3576|Mojokerto
  3577|Madiun
  3578|Surabaya
  3579|Batu
  |undefined
  36|Banten
  3601|Pandeglang
  3602|Lebak
  3603|Tangerang
  3604|Serang
  3671|Tangerang
  3672|Cilegon
  3673|Serang
  3674|Tangerang Selatan
  |undefined
  51|Bali
  5101|Jembrana
  5102|Tabanan
  5103|Badung
  5104|Gianyar
  5105|Klungkung
  5106|Bangli
  5107|Karangasem
  5108|Buleleng
  5171|Denpasar
  |undefined
  52|Nusa Tenggara Barat
  5201|Lombok Barat
  5202|Lombok Tengah
  5203|Lombok Timur
  5204|Sumbawa
  5205|Dompu
  5206|Bima
  5207|Sumbawa Barat
  5208|Lombok Utara
  5271|Mataram
  5272|Bima
  |undefined
  53|Nusa Tenggara Timur
  5301|Sumba Barat
  5302|Sumba Timur
  5303|Kupang
  5304|Timor Tengah Selatan
  5305|Timor Tengah Utara
  5306|Belu
  5307|Alor
  5308|Lembata
  5309|Flores Timur
  5310|Sikka
  5311|Ende
  5312|Ngada
  5313|Manggarai
  5314|Rote Ndao
  5315|Manggarai Barat
  5316|Sumba Tengah
  5317|Sumba Barat Daya
  5318|Nagekeo
  5319|Manggarai Timur
  5320|Sabu Raijua
  5321|Malaka
  5371|Kupang
  |undefined
  61|Kalimantan Barat
  6101|Sambas
  6102|Bengkayang
  6103|Landak
  6104|Mempawah
  6105|Sanggau
  6106|Ketapang
  6107|Sintang
  6108|Kapuas Hulu
  6109|Sekadau
  6110|Melawi
  6111|Kayong Utara
  6112|Kubu Raya
  6171|Pontianak
  6172|Singkawang
  |undefined
  62|Kalimantan Tengah
  6201|Kotawaringin Barat
  6202|Kotawaringin Timur
  6203|Kapuas
  6204|Barito Selatan
  6205|Barito Utara
  6206|Sukamara
  6207|Lamandau
  6208|Seruyan
  6209|Katingan
  6210|Pulang Pisau
  6211|Gunung Mas
  6212|Barito Timur
  6213|Murung Raya
  6271|Palangka Raya
  |undefined
  63|Kalimantan Selatan
  6301|Tanah Laut
  6302|Kotabaru
  6303|Banjar
  6304|Barito Kuala
  6305|Tapin
  6306|Hulu Sungai Selatan
  6307|Hulu Sungai Tengah
  6308|Hulu Sungai Utara
  6309|Tabalong
  6310|Tanah Bumbu
  6311|Balangan
  6371|Banjarmasin
  6372|Banjar Baru
  |undefined
  64|Kalimantan Timur
  6401|Paser
  6402|Kutai Barat
  6403|Kutai Kartanegara
  6404|Kutai Timur
  6405|Berau
  6409|Penajam Paser Utara
  6411|Mahakam Hulu
  6471|Balikpapan
  6472|Samarinda
  6474|Bontang
  |undefined
  65|Kalimantan Utara
  6501|Malinau
  6502|Bulungan
  6503|Tana Tidung
  6504|Nunukan
  6571|Tarakan
  |undefined
  71|Sulawesi Utara
  7101|Bolaang Mongondow
  7102|Minahasa
  7103|Kepulauan Sangihe
  7104|Kepulauan Talaud
  7105|Minahasa Selatan
  7106|Minahasa Utara
  7107|Bolaang Mongondow Utara
  7108|Siau Tagulandang Biaro
  7109|Minahasa Tenggara
  7110|Bolaang Mongondow Selatan
  7111|Bolaang Mongondow Timur
  7171|Manado
  7172|Bitung
  7173|Tomohon
  7174|Kotamobagu
  |undefined
  72|Sulawesi Tengah
  7201|Banggai Kepulauan
  7202|Banggai
  7203|Morowali
  7204|Poso
  7205|Donggala
  7206|Toli-Toli
  7207|Buol
  7208|Parigi Moutong
  7209|Tojo Una-Una
  7210|Sigi
  7211|Banggai Laut
  7212|Morowali Utara
  7271|Palu
  |undefined
  73|Sulawesi Selatan
  7301|Kepulauan Selayar
  7302|Bulukumba
  7303|Bantaeng
  7304|Jeneponto
  7305|Takalar
  7306|Gowa
  7307|Sinjai
  7308|Maros
  7309|Pangkajene Dan Kepulauan
  7310|Barru
  7311|Bone
  7312|Soppeng
  7313|Wajo
  7314|Sidenreng Rappang
  7315|Pinrang
  7316|Enrekang
  7317|Luwu
  7318|Tana Toraja
  7322|Luwu Utara
  7325|Luwu Timur
  7326|Toraja Utara
  7371|Makassar
  7372|Parepare
  7373|Palopo
  |undefined
  74|Sulawesi Tenggara
  7401|Buton
  7402|Muna
  7403|Konawe
  7404|Kolaka
  7405|Konawe Selatan
  7406|Bombana
  7407|Wakatobi
  7408|Kolaka Utara
  7409|Buton Utara
  7410|Konawe Utara
  7411|Kolaka Timur
  7412|Konawe Kepulauan
  7413|Muna Barat
  7414|Buton Tengah
  7415|Buton Selatan
  7471|Kendari
  7472|Baubau
  |undefined
  75|Gorontalo
  7501|Boalemo
  7502|Gorontalo
  7503|Pohuwato
  7504|Bone Bolango
  7505|Gorontalo Utara
  7571|Gorontalo
  |undefined
  76|Sulawesi Barat
  7601|Majene
  7602|Polewali Mandar
  7603|Mamasa
  7604|Mamuju
  7605|Pasangkayu
  7606|Mamuju Tengah
  |undefined
  81|Maluku
  8101|Kepulauan Tanimbar
  8102|Maluku Tenggara
  8103|Maluku Tengah
  8104|Buru
  8105|Kepulauan Aru
  8106|Seram Bagian Barat
  8107|Seram Bagian Timur
  8108|Maluku Barat Daya
  8109|Buru Selatan
  8171|Ambon
  8172|Tual
  |undefined
  82|Maluku Utara
  8201|Halmahera Barat
  8202|Halmahera Tengah
  8203|Kepulauan Sula
  8204|Halmahera Selatan
  8205|Halmahera Utara
  8206|Halmahera Timur
  8207|Pulau Morotai
  8208|Pulau Taliabu
  8271|Ternate
  8272|Tidore Kepulauan
  |undefined
  91|Papua Barat
  9101|Fakfak
  9102|Kaimana
  9103|Teluk Wondama
  9104|Teluk Bintuni
  9105|Manokwari
  9106|Sorong Selatan
  9107|Sorong
  9108|Raja Ampat
  9109|Tambrauw
  9110|Maybrat
  9111|Manokwari Selatan
  9112|Pegunungan Arfak
  9171|Sorong
  |undefined
  94|Papua
  9401|Merauke
  9402|Jayawijaya
  9403|Jayapura
  9404|Nabire
  9408|Kepulauan Yapen
  9409|Biak Numfor
  9410|Paniai
  9411|Puncak Jaya
  9412|Mimika
  9413|Boven Digoel
  9414|Mappi
  9415|Asmat
  9416|Yahukimo
  9417|Pegunungan Bintang
  9418|Tolikara
  9419|Sarmi
  9420|Keerom
  9426|Waropen
  9427|Supiori
  9428|Mamberamo Raya
  9429|Nduga
  9430|Lanny Jaya
  9431|Mamberamo Tengah
  9432|Yalimo
  9433|Puncak
  9434|Dogiyai
  9435|Intan Jaya
  9436|Deiyai
  9471|Jayapura`;
  const lines = data.split('\n');

  let kodeKota = null;

  lines.forEach(line => {
    const parts = line.split('|');
    const kode = parts[0];
    const namaKota = parts[1];
    if (namaKota.toLowerCase() === kota.toLowerCase()) {
      kodeKota = kode;
      return;
    }
  });

  return kodeKota;
}

function topic(bearer) {
  const index = fetch('https://api.kupu.id/course/userBadge/show/topic', {
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': 'F1B31279ED76D9596AECFD0808BB8E02',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'noncestr': 'JpPLnUpNgDrNLpphzzjBgHWqIHencfPY',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30316876973300884974e1e42798f5e2be78af3b23de95aaa2ece8b53'
      }
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function badgeList(idTopic, bearer) {
  const index = fetch('https://api.kupu.id/course/userBadge/topic/badgeList?topicId=' + idTopic + '', {
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': 'F1B31279ED76D9596AECFD0808BB8E02',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'noncestr': 'JpPLnUpNgDrNLpphzzjBgHWqIHencfPY',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30316876973300884974e1e42798f5e2be78af3b23de95aaa2ece8b53'
      }
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function categoryDetail(badgeCategoryId, bearer) {
  const index = fetch('https://api.kupu.id/course/userBadge/myBadgeCategoryDetail?badgeCategoryId=' + badgeCategoryId + '&role=2', {
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': 'F1B31279ED76D9596AECFD0808BB8E02',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'noncestr': 'JpPLnUpNgDrNLpphzzjBgHWqIHencfPY',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30316876973300884974e1e42798f5e2be78af3b23de95aaa2ece8b53'
      }
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function getLesson(courseId, bearer) {
  const index = fetch('https://api.kupu.id/course/lesson/searchLessonList/courseId/', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '29CAC70715E023319F3C6D4EFA17956C',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '60',
        'noncestr': 'sTiWtqUMrYHWPhmSoBsjzvgiKOBffCMx',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30416876992194981270e65cbd64f2313f960b7fa54bf1d2a472b470b'
      },
      body: JSON.stringify({
        'courseId': courseId,
        'pageNum': 1,
        'pageSize': 10
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function getTugas(courseId, lessonId, bearer) {
  const index = fetch('https://api.kupu.id/evaluation/selectQuestion/createExaminationPaper?courseId=' + courseId + '&lessonId=' + lessonId + '', {
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': 'A9C905C6A6B9CC1080A22689509603C0',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'noncestr': 'hcflEHGwIFodaKEMcFnoBtlXJaSXfpHU',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30616877170839762649e14385d76d3d233d1aad675078377ac801d89'
      }
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function play(courseId, lessonId, bearer) {
  const index = fetch('https://api.kupu.id/course/user-study/setStudyStatus', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '275F243912AE07BE656CCBDAA2E9DD8C',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '93',
        'noncestr': 'ITuUxbTnoBpYDyxxcubEFPbrjpBWfvJn',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30516877215989754201e7f7711ef31a07d98cac66009cae13c5280de'
      },
      body: JSON.stringify({
        'courseId': courseId,
        'finish': 2,
        'learnTime': 26,
        'lessonId': lessonId
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function jawabSalah(courseId, lessonId, question, idJawaban, bearer) {
  const index = fetch('https://api.kupu.id/evaluation/selectQuestion/remarkSelectQuestion', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '0AF8998D5E52A90B2363AA159A6BAC5B',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '196',
        'noncestr': 'zqCQeiUWJfaVTGnHAeyDlKgaqDnLLvta',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30616877170839762649e14385d76d3d233d1aad675078377ac801d89'
      },
      body: JSON.stringify({
        'answerReqIdS': [
          '' + idJawaban + ''
        ],
        'courseId': `${courseId}`,
        'lastQuestion': 0,
        'lessonId': `${lessonId}`,
        'selectQuestionId': `${question}`,
        'socreId': '1673010459348647938'
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function jawabBenar(idJawaban, courseId, lessonId, question, scoreID, bearer) {
  const index = fetch('https://api.kupu.id/evaluation/selectQuestion/remarkSelectQuestion', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '0AF8998D5E52A90B2363AA159A6BAC5B',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '196',
        'noncestr': 'zqCQeiUWJfaVTGnHAeyDlKgaqDnLLvta',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30616877170839762649e14385d76d3d233d1aad675078377ac801d89'
      },
      body: JSON.stringify({
        'answerReqIdS': [
          `${idJawaban}`
        ],
        'courseId': courseId,
        'lastQuestion': 0,
        'lessonId': lessonId,
        'selectQuestionId': question,
        'socreId': scoreID
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function jawabAkhir(idJawaban, courseId, lessonId, question, scoreID, bearer) {
  const index = fetch('https://api.kupu.id/evaluation/selectQuestion/remarkSelectQuestion', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '0AF8998D5E52A90B2363AA159A6BAC5B',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '196',
        'noncestr': 'zqCQeiUWJfaVTGnHAeyDlKgaqDnLLvta',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30616877170839762649e14385d76d3d233d1aad675078377ac801d89'
      },
      body: JSON.stringify({
        'answerReqIdS': [
          `${idJawaban}`
        ],
        'courseId': courseId,
        'lastQuestion': 1,
        'lessonId': lessonId,
        'selectQuestionId': question,
        'socreId': scoreID
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

function rateAkun(courseId, bearer) {
  const index = fetch('https://api.kupu.id/course/userRate/rate', {
      method: 'POST',
      headers: {
        'Host': 'api.kupu.id',
        'appType': 'kupu',
        'User-Agent': 'KUPU/2.0.3 (com.dspt.kupu.jobs; build:1522; iOS 16.0.0) Alamofire/5.2.2',
        'Time-ZoneId': 'Asia/Jakarta',
        'osVer': '16.0',
        'AFID': '1676686032150-3230461',
        'client': '2',
        'versionName': '2.0.3',
        'signature': '6B2E971D64B705B75D6C739195202A38',
        'device-id': 'dc7d032be3f947d4b1a70dcafc91b358',
        'versionCode': '1522',
        'Content-Length': '76',
        'noncestr': 'qaGtKgzhHXCSDEFhfcPyccpTAbgQFOIf',
        'platform': 'home',
        'Connection': 'close',
        'Authorization': `Bearer ${bearer}`,
        'Accept-Language': 'idl',
        'manufacturer-info': 'Apple',
        'platform-version': 'App-Store',
        'device-type': 'iPhone 12  Pro Max',
        'App-Name': 'KUPU',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'device': 'ios',
        'Cookie': 'acw_tc=9581d30516877215989754201e7f7711ef31a07d98cac66009cae13c5280de'
      },
      body: JSON.stringify({
        'courseId': courseId,
        'rateScore': 6,
        'review': '',
        'tags': 'Keren!'
      })
    })

    .then(async (res) => {
      const data = await res.json();
      return data;
    });
  return index;
}

(async () => {
  // while (true) {O
  //   const licenseCheckResult = await licenseCheck(license);
  //   const namaBuyer = licenseCheckResult.FullName;
  //   const duration = licenseCheckResult.Duration;
  //   const MachineId1 = licenseCheckResult.MachineId1;
  //   const MachineId2 = licenseCheckResult.MachineId2;
  //   let id = machineIdSync;
  //   let myId = id.machineSync({
  //     original: true
  //   });
  //   console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Machine Id :`, chalk.yellow(`${myId}`))
  //   if (namaBuyer) {
  //     console.log(chalk.white(`\nHas Found License`), chalk.green(`${namaBuyer}`), chalk.white(`Duration : `) + chalk.yellow(`${duration} Days\n`));

  //   } else {
  //     console.log(chalk.white(`\nNot Found License\n`));
  //     console.log(err)
  //     process.exit(0)
  //   }
  //   var data = `${MachineId1},${MachineId2}`;

  //   if (data.match(myId)) {} else {
  //     console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Not Found Machine ID On License :`, chalk.yellow(`${myId}`))
  //   }

  //   if (MachineId1 == '') {
  //     const addMachinez = await addMachine1(license, myId);
  //     console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Successfully Added Machine ID 1 :`, chalk.yellow(`${myId}`))
  //     continue;
  //   } else if (MachineId1 == myId) {
  //     console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Found Machine ID 1 :`, chalk.yellow(`${MachineId1}`))
  //     break;
  //   }

  //   if (MachineId2 == '') {
  //     const addMachinez = await addMachine2(license, myId);
  //     console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Successfully Added Machine ID 2 :`, chalk.yellow(`${myId}`))
  //     continue;
  //   } else if (MachineId2 == myId) {
  //     console.log(chalk.green('[') + chalk.white('!') + chalk.green(']'), `Found Machine ID 2 :`, chalk.yellow(`${MachineId2}`))
  //     break;
  //   }
  // }
  
  var bearer = fs.readFileSync('bearer.txt', 'UTF-8');
  console.log('\n[1] Auto All Task Badge')
  console.log('[2] Auto Send CV To All PT')
  console.log('[3] Login App Kupu')
  console.log();
  var pilihan = readlineSync.question('[!] Vote : ')
  console.log();
  if (pilihan == 1) {
    // var bearer = readlineSync.question('[!] Bearer : ')

    const getTopic = await topic(bearer);
    for (let index = 0; index < getTopic.body.length; index++) {
      var idTopic = getTopic.body[index].id
      var nameTopic = getTopic.body[index].topic

      if (index < 10) {
        console.log(`[${index}] ` + chalk.yellow(`ID Topik ${idTopic}`));
        console.log('    ' + chalk.yellow(`Name Topik ${nameTopic}`));
      } else if (index > 10) {
        console.log(`[${index}] ` + chalk.yellow(`ID Topik ${idTopic}`));
        console.log('     ' + chalk.yellow(`Name Topik ${nameTopic}`));
      }

      console.log();
      var idTopic = getTopic.body[index].id;
      console.log();
      const listBudget = await badgeList(idTopic, bearer);
      for (let index1 = 0; index1 < listBudget.body.length; index1++) {
        badgeCategoryId = listBudget.body[index1].badgeCategoryId
        console.log(`[${index1}] ` + chalk.yellow(`Badge Category ${badgeCategoryId}`));

        console.log();
        var idTopic = listBudget.body[index1].badgeCategoryId
        console.log();
        const getTask = await categoryDetail(badgeCategoryId, bearer);
        for (let index2 = 0; index2 < getTask.body.userBadgeList.length; index2++) {
          courseID = getTask.body.userBadgeList[index2].badgeCourseList[0].courseId;
          console.log(`[${index2}] ` + chalk.yellow(`Course ID Ditemukan ${courseID}`));

          console.log();
          var courseId = getTask.body.userBadgeList[index2].badgeCourseList[0].courseId;
          console.log();
          const voteCourse = await getLesson(courseId, bearer)
          for (let index3 = 0; index3 < voteCourse.body.length; index3++) {
            var lessonId = voteCourse.body[index3].id;
            const status = voteCourse.body[index3].finish;
            if (status > 3) {
              console.log(`[${index3}] ` + chalk.yellow(`Lesson ID Ditemukan ${lessonId} [ Sudah Dikerjakan ]`));
              continue;
            } else {
              console.log(`[${index3}] ` + chalk.yellow(`Lesson ID Ditemukan ${lessonId} [ Belum Dikerjakan ]`));
            }

            console.log();
            var lessonId = voteCourse.body[index3].id;
            var nameTask = voteCourse.body[index3].title;
            console.log();
            console.log(`[!] Kamu Memilih ${nameTask} lessonID ${lessonId}`);
            console.log();

            var playTask = await play(courseId, lessonId, bearer)
            var getQuestion = await getTugas(courseId, lessonId, bearer);
            for (let index4 = 0; index4 < getQuestion.body.length; index4++) {
              var question = getQuestion.body[index4].selectQuestion;
              var idAnswer = getQuestion.body[index4].id;
              var scoreID = getQuestion.body[index4].scoreId;
              console.log(`[${index4}] ` + chalk.yellow(`Pertanyaan : ${question}`));
              console.log(`    ` + chalk.yellow(`ID Answer  : ${idAnswer}`));
              console.log(`    ` + chalk.yellow(`Score ID   : ${scoreID}`));
              console.log();
              while (true) {
                indexc = 0;
                var jawaban = getQuestion.body[index4].answersDtoList[indexc].selectQuestionId;
                const jawabanHuruf = getQuestion.body[index4].answersDtoList[indexc].answer;
                const jawabanTest = getQuestion.body[index4].answersDtoList[1].id;
                if (index == 0) {
                  console.log(`[A] ` + chalk.yellow(`Answer : ${jawabanHuruf}`));
                } else if (index == 1) {
                  console.log(`[B] ` + chalk.yellow(`Answer : ${jawabanHuruf}`));
                } else if (index == 2) {
                  console.log(`[C] ` + chalk.yellow(`Answer : ${jawabanHuruf}`));
                } else if (index == 3) {
                  console.log(`[D] ` + chalk.yellow(`Answer : ${jawabanHuruf}`));
                }
                var mulaiJawabSalah = await jawabSalah(courseId, lessonId, idAnswer, jawabanTest, bearer);
                var correctId = mulaiJawabSalah.body.correctIds[0];

                var mulaiJawabBenar = await jawabBenar(correctId, courseId, lessonId, idAnswer, scoreID, bearer);

                if (mulaiJawabBenar.body.correct == 1) {
                  console.log(`    ` + chalk.yellow(`Jawaban Benar Score ID ${scoreID}`));
                  break;
                } else {
                  console.log(`    ` + chalk.yellow(`Jawaban Salah`));
                }
                indexc++;
              }
            }

            var mulaiJawabBenar = await jawabAkhir(correctId, courseId, lessonId, idAnswer, scoreID, bearer);
            var rate = await rateAkun(courseId, bearer);
          }
        }
      }
    }
  } else if (pilihan == 2) {
    const read3 = fs.readFileSync('jenisjob.txt', 'UTF-8');
    const list2 = read3.split(/\r?\n/);
    var kodeDiinginkan = fs.readFileSync('kotaDiinginkan.txt', 'UTF-8');
    const list4 = kodeDiinginkan.split(/\r?\n/);

    // var bearer = readlineSync.question('[!] Bearer : ')

    for (let index = 0; index < list2.length; index++) {
      var kota = list4[index].split('|')[0];
      for (var i = 0; i < list2.length; i++) {
        var jenisJob = list2[i].split('|')[0];
        var kodeId = getKotaKode(kota);
        var kodeId = kodeId.replace('  ', '');
        const getJob = await getCode(jenisJob, bearer, kodeId);
        var total = getJob.body.jobResList.length;
        for (let index = 0; index < getJob.body.jobResList.length; index++) {
          console.log(`[!] Sedang Melamar Di Kota ${kota} Dengan Kode Kota ${kodeId}`)
          console.log(`[!] Dengan Jenis Job ${jenisJob}`)
          try {
            var idJob = getJob.body.jobResList[index].id;
            var jobTitle = getJob.body.jobResList[index].jobTitle;
            var companyName = getJob.body.jobResList[index].companyName;
            var salary = getJob.body.jobResList[index].salaryRangeFmt;
            var city = getJob.body.jobResList[index].cityName;
            console.log(chalk.white('[') + chalk.green(`${index}/${total}`) + chalk.white('] ' + chalk.yellow(`Melamar Ke ${companyName}`)))
            if (index >= 10) {
              console.log(chalk.white('     ') + chalk.yellow(`Kota ${city}`))
              console.log(chalk.white('     ') + chalk.yellow(`Job Title ${jobTitle}`))
              console.log(chalk.white('     ') + chalk.yellow(`Salary ${salary}`))
              console.log(chalk.white('     ') + chalk.yellow(`Job ID ${idJob}`))
            }

            if (index < 10) {
              console.log(chalk.white('    ') + chalk.yellow(`Kota ${city}`))
              console.log(chalk.white('    ') + chalk.yellow(`Job Title ${jobTitle}`))
              console.log(chalk.white('    ') + chalk.yellow(`Salary ${salary}`))
              console.log(chalk.white('    ') + chalk.yellow(`Job ID ${idJob}`))
            }

            const applyJob = await apply(idJob, bearer);
            var message = applyJob.message
            console.log(chalk.white('     ') + chalk.yellow(`Message ${message}`))
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  } else if (pilihan == 3) {


    const phone = readlineSync.question(`[${date()}] Phone: `);
    const sendTo = readlineSync.question(`[${date()}] Send to (1: sms, 2: wa): `);

    log(`[${date()}] ${colors.yellow(`Encrypting data...`)}`);
    const encryptOtpReqData = await fetch(api + "encrypt", {
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
        "body": JSON.stringify({
            phone,
            type: "otp"
        }),
        "method": "POST",
    }).then(res => res.text());

    let otpReqUrl;
    if (sendTo == 1) {
        otpReqUrl = "https://api.kupu.id/user/sendmobilecode";
    } else if (sendTo == 2) {
        otpReqUrl = "https://api.kupu.id/user/v3/sendWhatsappCode";
    } else {
        log(`[${date()}] ${colors.red(`Invalid send to`)}`);
        return;
    }

    log(`[${date()}] ${colors.yellow(`Requesting otp to ${colors.green(phone)}`)}`);
    const reqOtp = await fetch(otpReqUrl, {
        method: 'POST',
        headers: {
            'traceId': '1694535280094',
            'screen_width': '1080',
            'versionName': '2.2.1',
            'device-id': '6f4254dd09f08aca',
            'osVer': '29',
            'versionCode': '93',
            'platform': 'home',
            'Time_ZoneId': 'Asia/Jakarta',
            'noncestr': 'bb788d75c9424f338aeb15beab27edc7',
            'LOGIN_DEVICE_TYPE': 'Redmi Note 7',
            'screen_height': '2340',
            'appType': 'kupu',
            'device-type': 'Redmi Note 7',
            'manufacturer-info': 'Xiaomi',
            'Accept-Language': 'en',
            'device': 'android',
            'AFID': '1694534051173-1554747706822044664',
            'signature': 'B49F0BA4333EB276AE4B10782ED3EC5E',
            'sign': 'd41d8cd98f00b204e9800998ecf8427e',
            'Content-Type': 'application/json; charset=UTF-8',
            'Host': 'api.kupu.id',
            'User-Agent': 'okhttp/3.14.9'
        },
        body: encryptOtpReqData
    }).then(res => res.json());

    if (reqOtp.code != 0) {
        log(`[${date()}] ${colors.red(reqOtp.message)}`);
        return;
    } else {
        log(`[${date()}] ${colors.green(`OTP request success`)}`);
    }

    const otp = readlineSync.question(`[${date()}] OTP: `);

    log(`[${date()}] ${colors.yellow(`Encrypting data...`)}`);

    const encryptVerifyReqData = await fetch(api + "encrypt", {
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
        "body": JSON.stringify({
            phone,
            type: "verify",
            code: otp
        }),
        "method": "POST",
    }).then(res => res.text());

    const verifyReq = await fetch('https://api.kupu.id/user/v3/mobile/login', {
        method: 'POST',
        headers: {
            'traceId': '1694535318089',
            'screen_width': '1080',
            'versionName': '2.2.1',
            'device-id': '6f4254dd09f08aca',
            'osVer': '29',
            'versionCode': '93',
            'platform': 'home',
            'Time_ZoneId': 'Asia/Jakarta',
            'noncestr': '17e4493908924c6bad26968c3e9acda5',
            'LOGIN_DEVICE_TYPE': 'Redmi Note 7',
            'screen_height': '2340',
            'appType': 'kupu',
            'device-type': 'Redmi Note 7',
            'manufacturer-info': 'Xiaomi',
            'Accept-Language': 'en',
            'device': 'android',
            'AFID': '1694534051173-1554747706822044664',
            'signature': '614C20BB99D2857E8DD915875695336F',
            'sign': 'd41d8cd98f00b204e9800998ecf8427e',
            'Content-Type': 'application/json; charset=UTF-8',
            'Host': 'api.kupu.id',
            'User-Agent': 'okhttp/3.14.9'
        },
        body: encryptVerifyReqData
    }).then(res => res.json());


    if (verifyReq.code != 0) {
        log(`[${date()}] ${colors.red(verifyReq.message)}`);
        return;
    } else {
        log(`[${date()}] ${colors.green(`OTP verify success`)}`);

        log(`[${date()}] ${colors.yellow(`Decrypting data...`)}`);

        const decryptData = await fetch(api + "decrypt", {
            "headers": {
                "content-type": "application/json;charset=UTF-8",
            },
            "body": JSON.stringify({
                aesKey: verifyReq.aesKey,
                data: verifyReq.body
            }),
            "method": "POST",
        }).then(res => res.json());

        const token = decryptData.token;

        log(`[${date()}] ${colors.green(`Bearer Token: ${token}`)}`);
        fs.appendFileSync('bearer.txt', `${token}`)
    }
  }
})();

function unix(rarityLocked) {
  var date = new Date(rarityLocked)
  let year = date.getFullYear(); // 2020
  let month = date.getMonth() + 1; // 4 (note zero index: Jan = 0, Dec = 11)
  let day = date.getDate(); // 9
  let hour = date.getHours(); // 14
  let minute = date.getMinutes(); // 28
  let second = date.getSeconds();
  return ({
    day,
    month,
    year,
    hour,
    minute,
    second
  })
  // console.log(`${day}-${month}-${year} [ ${hour}:${minute}${second} ]`)
}

function addMachine1(license, machine) {
  var license = fetch(`https://whitelist-bot.com/rahasiaku/editmachine.php?license=${license}`, {
    method: 'POST',
    headers: {
      'Host': 'whitelist-bot.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
      'Origin': 'https://whitelist-bot.com',
      'Referer': 'https://whitelist-bot.com/rahasiaku/',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Te': 'trailers'
    },
    body: new URLSearchParams({
      'MachineId1': machine
    })
  })
}

function addMachine2(license, machine) {
  var license = fetch(`https://whitelist-bot.com/rahasiaku/editmachine.php?license=${license}`, {
    method: 'POST',
    headers: {
      'Host': 'whitelist-bot.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
      'Origin': 'https://whitelist-bot.com',
      'Referer': 'https://whitelist-bot.com/rahasiaku/',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Te': 'trailers'
    },
    body: new URLSearchParams({
      'MachineId2': machine
    })
  })
}

function licenseCheck(license) {
  var license = fetch(`https://whitelist-bot.com/api.php?license=${license}`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "_ga=GA1.2.1441011143.1656930356"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    })

    .then(async res => {
      const data = await res.json()
      return data
    })
  return license
}