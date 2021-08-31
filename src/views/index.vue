<template>
  <div class="storelocator-top open">
    <div class="row m-0">
      <div class="col-sm-4">
        <div class="storelocator-search">
          <div class="filter-block">
            <div class="storelocator-search-heading">Tra cứu</div>
            <div class="filter-box">
              <div class="filter-address">
                <div class="title-filter col-sm-12">Quận/Huyện</div>
                <div class="form-group col-sm-6">
                  <select class="form-control" v-model="isquan">
                    <option :value="null">Tất cả</option>
                    <option
                      v-for="(p, index) in quan"
                      :key="index"
                      :value="p.id"
                    >
                      {{ p.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-sm-6">
                  <select class="form-control" v-model="isphuong">
                    <option value="">Tất cả</option>
                    <option
                      v-for="(p, index) in dataPhuong"
                      :key="index"
                      :value="p.id"
                    >
                      {{ p.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="title-filter">Di tích xếp hạng</label>
                <select class="form-control" v-model="is_ditich">
                  <option value="">Tất cả</option>
                  <option
                    v-for="(p, index) in ditichxephang"
                    :key="index"
                    :value="p.id"
                  >
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="title-filter">Loại hình di sản thời kỳ</label>
                <select class="form-control" v-model="is_disan">
                  <option value="">Tất cả</option>
                  <option
                    v-for="(p, index) in disan"
                    :key="index"
                    :value="p.id"
                  >
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="title-filter">Lễ hội</label>
                <select class="form-control" v-model="is_lehoi">
                  <option value="">Tất cả</option>
                  <option
                    v-for="(p, index) in lehoi"
                    :key="index"
                    :value="p.id"
                  >
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <button class="btn" @click="searchLocation(check)">
                TÌM KIẾM
              </button>
            </div>
          </div>
          <div class="storelocator-search-result">
            <div class="storelocator-result-heading">Kết quả</div>
            <div class="storelocator-search-result-box">
              <div
                class="storelocator-search-result-item"
                v-for="(data, index) in markersLoad"
                :key="index"
                @click="indexActive = data.id_detail"
                :class="indexActive == data.id_detail ? 'active' : ''"
              >
                <div class="title">{{ data.store_name }}</div>
                <div class="address">
                  {{ data.address }}
                </div>
                <div class="phone">{{ data.address }}</div>
                <!-- <div class="time">
                  Giờ mở cửa: {{ data.monday_open }} - {{ data.monday_close }}
                </div> -->
              </div>
            </div>
          </div>
          <!-- <div class="storelocator-search-map"></div> -->
        </div>
      </div>
      <div class="col-sm-8">
        <GmapMap :zoom="13" :center="center" style="width: 100%; height: 800px">
          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          />
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="positions(m)"
            :draggable="true"
            :icon="icon.url"
            :clickable="true"
            @click="toggleInfoWindow(m, index)"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { gmapApi } from "vue2-google-maps";
import * as quanJson from "../libs/quan_huyen.json";
import * as phuongJson from "../libs/phuong_xa.json";
import * as ditichJson from "../libs/thamquan.json";
import { createDummyData } from "@/utils/createDummyData";

const quan = quanJson.default;
const phuong = phuongJson.default;
const ditich = ditichJson.default.concat(createDummyData());

export default {
  name: "MAP_GOOGLE",
  data() {
    return {
      quan: quan,
      phuong: phuong,
      center: { lat: 21.027866815220005, lng: 105.83394801948478  },
      isquan: null,
      isphuong: null,
      infoWinOpen: false,
      dataPhuong: [],
      check: null,
      dataOption: [
        {
          title: "test A",
          quanhuyen: "abc123",
          phuongxa: "abc123",
          loaiditich: "abc123",
          xephang: "abc123",
          lehoi: "abc123",
          geometry: {
            type: "Point",
            coordinates: [21.035861030806544, 105.83366364633545],
          },
        },
      ],
      dataditich: ditich,
      markers: null,
      markersLoad: null,
      icon: {
        url: "/assets/google-maps.png",
      },
      infoWindowPos: null,
      infoContent: null,
      currentMidx: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
      },
      indexActive: null,
      ditichxephang: [
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
      ],
      disan: [
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
      ],
      lehoi: [
        {
          name: "Có lễ hội",
          id: 1,
        },
        {
          name: "Không lễ hội",
          id: 2,
        },
      ],
      is_ditich: null,
      is_disan: null,
      is_lehoi: null,
    };
  },
  computed: {
    ...mapGetters(["getInforUser"]),
    google: gmapApi,
  },
  mounted() {
    console.log("center", this.center)
    this.geolocate();
    this.markers = ditich;
    this.markersLoad = ditich;
    this.dataPhuong = this.phuong;
  },
  created() {
    // this.$router.push('disanvanhoa') 
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    searchLocation(check) {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: check }, (results, status) => {
        if (status === "OK") {
          this.center.lat = results[0].geometry.location.lat();
          this.center.lng = results[0].geometry.location.lng();
        }
      });
    },
    toggleInfoWindow(marker, idx) {
      let image =
        "https://halotravel.vn/wp-content/uploads/2020/08/du-lich-hoang-thanh-thang-long.jpg";
      this.infoWindowPos = this.positions(marker);
      this.infoOptions.content = `
        <h3>${marker.store_name}</h3>
        <br />
        <img height="300px" width="400px"  src="${image}"/>`;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    positions(m) {
      return {
        lat: m.latitude,
        lng: m.longitude,
      };
    },
    searchMarke() {
      let filter = {
        city: this.isquan,
      };

      if (this.is_ditich) {
        filter.xep_hang = this.is_ditich;
      }

      if (this.is_disan) {
        filter.loai_hinh = this.is_disan;
      }

      if (this.is_lehoi) {
        filter.le_hoi = this.is_lehoi;
      }

      if (this.isphuong) {
        filter.simistorelocator_id = this.isphuong;
      }

      if (filter.city == null) {
        delete filter.city;
      }

      console.log(filter, this.dataditich);
      let data = this.dataditich.filter(function (item) {
        for (var key in filter) {
          if (item[key] == null || item[key] == "" || item[key] != filter[key])
            return false;
        }
        return true;
      });

      this.markers = data;
      this.markersLoad = data;
    },
  },

  watch: {
    isquan() {
      let vm = this;
      if (vm.isquan == null) {
        this.dataPhuong = vm.phuong;
      } else {
        vm.dataPhuong = vm.phuong.filter((e) => e.districtID == this.isquan);
      }
      this.searchMarke();
    },
    isphuong() {
      if (this.isquan != null) {
        let nameSearch = this.quan.filter((e) => (e.id = this.isquan))[0].name;
        console.log(nameSearch);
        this.searchLocation(nameSearch);
      } 
      this.searchMarke();
    },
    indexActive() {
      this.markers = this.dataditich.filter(
        (e) => e.id_detail == this.indexActive
      );
    },
    is_ditich() {
      this.searchMarke();
    },
    is_disan() {
      this.searchMarke();
    },
    is_lehoi() {
      this.searchMarke();
    },
  },
};
</script>

<style></style>
