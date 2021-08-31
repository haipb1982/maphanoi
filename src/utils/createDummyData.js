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

const maxLat = 21.05;
const minLat = 21;
const maxLong = 105.85;
const minLong = 105.8;

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
    dummy.store_name = "test Google Map name " + i;
    dummy.address = i + "  Hanoi street address";
    dummy.baseimage_id = null;
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
