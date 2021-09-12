<template>
	<div class="storelocator-top open">
		<div class="row filter-nav m-0" v-if="isHaveFilter">
			<div class="left">
				<select class="form-control" v-model="isquan">
					<option :value="null">Quận/Huyện</option>
					<option v-for="(p, index) in quan" :key="index" :value="p.id">
						{{ p.name }}
					</option>
				</select>

				<select class="form-control" v-model="isphuong">
					<option :value="null">Phường/Xã</option>
					<option v-for="(p, index) in dataPhuong" :key="index" :value="p.id">
						{{ p.name }}
					</option>
				</select>

				<select class="form-control" v-model="is_ditich">
					<option :value="null">Di tích xếp hạng</option>
					<option v-for="(p, index) in ditichxephang" :key="index" :value="p.id">
						{{ p.name }}
					</option>
				</select>

				<select class="form-control" v-model="is_disan">
					<option :value="null">Di sản</option>
					<option v-for="(p, index) in disan" :key="index" :value="p.id">
						{{ p.name }}
					</option>
				</select>

				<select class="form-control" v-model="is_lehoi">
					<option :value="null">Lễ hội</option>
					<option v-for="(p, index) in lehoi" :key="index" :value="p.id">
						{{ p.name }}
					</option>
				</select>

				<button class="btn" @click="searchLocation(check)">Tra cứu</button>
			</div>
			<!-- search by keyword -->
			<div class="right" v-if="isHaveSearch">
				<input type="search" v-model="keywords" placeholder="Từ khóa..." />
				<button class="btn" @click="searchKeywords">Tìm kiếm</button>
			</div>
		</div>

		<div class="row m-0 main-map">
			<div class="col-map">
				<GmapMap :zoom="mapZoom" :center="mapCenter" style="width: 100%; height: 100%">
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
						:draggable="false"
						:icon="icon.url"
						:clickable="true"
						@click="toggleInfoWindow(m, index)"
					/>
				</GmapMap>
			</div>
			<div class="col-result">
				<div class="storelocator-search">
					<div class="storelocator-search-result">
						<div class="storelocator-result-heading" style="background:#000;">{{ searchResultTitle }}</div>
						<div class="storelocator-search-result-box">
							<div
								class="storelocator-search-result-item"
								v-for="(data, index) in markersLoad"
								:key="index"
								@click="showLocation(data.id_detail)"
								
							>
								<div class="item-left">
									<div class="image">																				
										<img v-if="data.image" :src="data.image" />
										<img v-else src="https://vnztech.com/demo/wp-content/uploads/2021/08/31-5830.jpeg" />
									</div>
								</div>
								<div class="item-right">
									<div class="title">{{ data.store_name }}</div>
									<div class="address">
										{{ data.address }}
									</div>
                  <!-- <div class="description"><a :href="data.link_web">chi tiết</a></div> -->
								</div>

								<!-- <div class="time">
                  Giờ mở cửa: {{ data.monday_open }} - {{ data.monday_close }}
                </div> -->
							</div>
						</div>
					</div>
					<!-- <div class="storelocator-search-map"></div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { gmapApi } from "vue2-google-maps";
	import * as quanJson from "@/libs/quan_huyen.json";
	import * as phuongJson from "@/libs/phuong_xa.json";
	import * as disanvanhoaJson from "@/libs/disanvanhoa.json";
	import * as ditichJson from "@/libs/ditich.json";
	import * as thamquanaoJson from "@/libs/thamquanao.json";
	import { createDummyData } from "@/utils/createDummyData";

	const quan = quanJson.default;
	const phuong = phuongJson.default;
	// const mapdata = ditichJson.default.concat(createDummyData());

	export default {
		name: "MAP_GOOGLE",
		data() {
			return {
				maptype: "disanvanhoa",
				mapdata: [],
				isHaveFilter: true,
				isHaveSearch: true,
				quan: quan,
				phuong: phuong,
				mapCenter: { lat: 21.027866815220005, lng: 105.83394801948478 },
        mapZoom: 13,
				isquan: null,
				isphuong: null,
				infoWinOpen: false,
				dataPhuong: [],
				check: null,
				keywords: null,
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
				// dataditich: this.mapdata,
				markers: null,
				markersLoad: null,
				icon: {
					url: "google-maps.png",
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
				imageDefault : 'https://vnztech.com/demo/wp-content/uploads/2021/08/31-5830.jpeg',
				searchResultTitle : "Kết quả tìm kiếm"
			};
		},
		computed: {
			...mapGetters(["getInforUser"]),
			google: gmapApi,
		},
		mounted() {
			// console.log("$route.params.maptype ", this.$route.params.maptype )
			this.geolocate();
			this.markers = this.mapdata;
			this.markersLoad = this.mapdata;
			this.dataPhuong = this.phuong;
		},
		created() {
			// console.log("maptype", this.$route.params["maptype"]);
			// console.log("path", this.$route.path);

			// this.maptype = this.$route.params["maptype"];
			let path = this.$route.path;

			// console.log("path",path)

			switch (path) {
				case "/ditich.html":
					this.maptype = 'ditich';
					this.mapdata = ditichJson.default;
					// console.log("ditichJson",ditichJson.default)
					this.searchResultTitle = "Kết quả tìm kiếm";
					break;
				case "/thamquanao.html":
					this.maptype = 'thamquanao';
					this.mapdata = thamquanaoJson.default;
					this.isHaveFilter = false;
					this.isHaveSearch = false;
					this.searchResultTitle = "Danh sách tham quan ảo";
					// console.log("thamquanaoJson",thamquanaoJson.default)
					break;
				default:
					this.maptype = 'disanvanhoa';
					// console.log("disanvanhoaJson",disanvanhoaJson.default)
					this.mapdata = disanvanhoaJson.default;
					this.searchResultTitle = "Kết quả tìm kiếm";
			}

			this.mapdata = this.mapdata.concat(createDummyData());

			// console.log("created", this.mapdata);
		},
		methods: {
      showLocation(id){
        // console.log("showLocation",id)
          let location = this.mapdata.filter((e) => e.id_detail == id);
          this.markers = location;
          this.toggleInfoWindow(this.markers[0],1)
        // console.log("showLocation",location[0])

				this.mapCenter = {
					lat: Number(location[0].latitude),
					lng: Number(location[0].longitude),
				};

        this.mapZoom = Number(location[0].zoom_level)
				// console.log("showLocation detail", this.mapCenter);
      },
			geolocate() {
				navigator.geolocation.getCurrentPosition((position) => {
					this.mapCenter = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
				});
			},
			searchLocation(check) {
				var geocoder = new window.google.maps.Geocoder();
				geocoder.geocode({ address: check }, (results, status) => {
					if (status === "OK") {
						this.mapCenter.lat = results[0].geometry.location.lat();
						this.mapCenter.lng = results[0].geometry.location.lng();
					}
				});
			},
			searchKeywords() {
				console.log(this.keywords);

				var kw = this.keywords.toUpperCase();

				let data = this.mapdata.filter(function(item) {
					return item["store_name"].toUpperCase().indexOf(kw) != -1;
				});

				console.log("searchKeywords", data);
				this.markers = data;
				this.markersLoad = data;
			},
			toggleInfoWindow(marker, idx) {
        console.log("toggleInfoWindow",marker),idx;
				this.infoWindowPos = this.positions(marker);
				this.infoOptions.content = `
        <h3>${marker.store_name}</h3>
		
        <img height="100px" width="100px" style="float:right" src="${marker.image ? marker.image : 'https://vnztech.com/demo/wp-content/uploads/2021/08/31-5830.jpeg'}"/>
        <br />
        ${marker.description}
		<br />`;
		
		let detaillink = `
		<a href="${marker.link_web ? marker.link_web : 'http://vnztech.com/demo/'}" target=_blank>chi tiết</a>
        `;
		if (this.maptype != 'disanvanhoa')
		this.infoOptions.content += detaillink;


this.infoWinOpen = true;
				//check if its the same marker that was selected if yes toggle
				// if (this.currentMidx == idx) {
				// 	this.infoWinOpen = !this.infoWinOpen;
				// }
				// //if different marker set infowindow to open and reset current marker index
				// else {
				// 	this.infoWinOpen = true;
				// 	this.currentMidx = idx;
				// }
			},

			positions(m) {

        // console.log("positions",m)
				return {
					lat: m.latitude,
					lng: m.longitude,
				};
			},
			searchMarke() {
				console.log("searchMarke", this.mapdata);

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

				console.log(filter, this.mapdata);
				let data = this.mapdata.filter(function(item) {
					for (var key in filter) {
						if (item[key] == null || item[key] == "" || item[key] != filter[key]) return false;
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
				this.markers = this.mapdata.filter((e) => e.id_detail == this.indexActive);

				this.mapCenter = {
					lat: Number(this.mapdata[0].latitude),
					lng: Number(this.mapdata[0].longitude),
				};
				console.log("center detail", this.mapCenter);
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

<style>
	.filter-nav {
		display: flex;
		justify-content: space-between;
		padding: 0 15px;
	}
</style>
