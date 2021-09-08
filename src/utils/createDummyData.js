import * as quanJson from "../libs/quan_huyen.json";
import * as phuongJson from "../libs/phuong_xa.json";

const quan = quanJson.default;
const phuong = phuongJson.default;

const xep_hang = [
  {
    name: "Cấp quốc gia đặc biệt",
    id: 1,
  },
  {
    name: "Cấp quốc gia",
    id: 2,
  },
  {
    name: "Cấp thành phố",
    id: 3,
  },
  {
    name: "Chưa xếp hạng",
    id: 4,
  },
];
const loai_hinh = [
  {
    name: "Di tích lịch sử văn hóa",
    id: 1,
  },
  {
    name: "Di tích kiến trúc nghệ thuật",
    id: 2,
  },
  {
    name: "Danh lam thắng cảnh",
    id: 3,
  },
  {
    name: "Di tích khảo cổ",
    id: 4,
  },
  {
    name: "Di tích lịch sử cách mạng",
    id: 5,
  },
];
const le_hoi = [
  {
    name: "Có lễ hội",
    id: 1,
  },
  {
    name: "Không lễ hội",
    id: 2,
  },
];

const image =[
  "https://vnztech.com/demo/wp-content/uploads/2021/08/31-5830.jpeg",
  "https://vnztech.com/demo/wp-content/uploads/2018/05/hanoi_opera_house-500x281.webp",
  "https://vnztech.com/demo/wp-content/uploads/2018/05/phong-canh-chua-tran-quoc.jpg",
  "https://halotravel.vn/wp-content/uploads/2020/08/du-lich-hoang-thanh-thang-long.jpg",
  "https://vnztech.com/demo/wp-content/uploads/2018/11/javo-directory-wp-theme03.jpg"
]

const link_web =[
  "https://vnztech.com/demo/portfolio/chua-mot-cot/",
  "https://vnztech.com/demo/portfolio/trong-dong-dong-xa/",
  "https://vnztech.com/demo/top-10-di-tich-lich-su-o-ha-noi-ban-nhat-dinh-phai-kham-pha/",
  "https://vnztech.com/demo/tai-nguyen-di-san-cua-ha-noi-tiem-nang-can-khoi-day/"
]

const title =[
"Sed ut perspiciatis unde omnis iste natus ",
 "Accusantium doloremque laudantium", 
 "Veritatis et quasi architecto beatae vitae ", 
 "Nemo enim ipsam voluptatem quia voluptas", 
 "Sed quia consequuntur magni dolores ", 
 "Neque porro quisquam est, qui dolorem ",
  "Adipisci velit, sed quia non numquam eius ",
   "Et dolore magnam aliquam quaerat voluptatem", 
   "Quis nostrum exercitationem ullam corporis ", 
   "Nisi ut aliquid ex ea commodi consequatur ",
]

const maxLat = 21.06;
const minLat = 20.9;
const maxLong = 105.95;
const minLong = 105.7;

const DATA_NUMBERS = 200;
export function createDummyData() {
  let data = [];
  let dummy = {};

  for (var i = 0; i < DATA_NUMBERS; i++) {
    let quanrandom = quan[getRandomInt(0, quan.length)];
    let randomPhuong = phuong.filter((e) => e.districtID == quanrandom.id);
    dummy = {};
    dummy.simistorelocator_id =
      randomPhuong[getRandomInt(0, randomPhuong.length)].id;
    // dummy.simistorelocator_id = 1;
    dummy.latitude = getRandom(minLat, maxLat);
    dummy.longitude = getRandom(minLong, maxLong);
    dummy.store_name = title[getRandomInt(0,9)] + i;
    dummy.address = i + "  Hanoi street address";
    dummy.baseimage_id = null;
    dummy.image = image[getRandomInt(0, 4)];
    dummy.link_web = link_web[getRandomInt(0, 4)]
    dummy.city = quanrandom.id;
    dummy.description =
      "dummy descriptions " + dummy.latitude + " " + dummy.longitude;
    dummy.xep_hang = xep_hang[getRandomInt(0, 3)].id;
    dummy.loai_hinh = loai_hinh[getRandomInt(0, 4)].id;
    dummy.le_hoi = le_hoi[getRandomInt(0, 1)].id;
    dummy.phuong = le_hoi[getRandomInt(0, 1)].id;
    dummy.id_detail = getRandomInt(0, 10000000000);
    data.push(dummy);
  }

  console.log("createDummyData",data.length)
  return data;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(minInt, maxInt) {
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}
