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
										<option value="">Tất cả</option>
										<option
											v-for="(q, index) in quan"
											:key="index"
											:value="q.id"
										>
											{{ q.name }}
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
									<option value=""> Tất cả</option>
									<option
										v-for="(p, index) in ditichxephang"
										:key="index"
										:value="p.name"
									>
										{{ p.name }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<label class="title-filter">Loại hình di sản thời kỳ</label>
								<select class="form-control" v-model="is_disan">
									<option value=""> Tất cả</option>
									<option
										v-for="(p, index) in disan"
										:key="index"
										:value="p.name"
									>
										{{ p.name }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<label class="title-filter">Lễ hội</label>
								<select class="form-control" v-model="is_lehoi">
									<option value=""> Tất cả</option>
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
								@click="indexActive = data.simistorelocator_id"
								:class="indexActive == data.simistorelocator_id ? 'active' : ''"
							>
								<div class="title">{{ data.store_name }}</div>
								<div class="address">
									{{ data.address }}
								</div>
								<div class="phone">{{ data.address }}</div>
								<div class="time">
									Giờ mở cửa: {{ data.monday_open }} - {{ data.monday_close }}
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="storelocator-search-map"></div> -->
				</div>
			</div>
			<div class="col-sm-8">
				<GmapMap :zoom="14" :center="center" style="width: 100%; height: 800px">
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
import * as quanJson from "../../libs/quan_huyen.json";
import * as phuongJson from "../../libs/phuong_xa.json";
import * as ditichJson from "../../libs/thamquan.json";

const quan = quanJson.default;
const phuong = phuongJson.default;
const ditich = ditichJson.default;

export default {
	name: "MAP_GOOGLE",
	data() {
		return {
			quan: quan,
			phuong: phuong,
			center: { lat: 10, lng: 10 },
			isquan: "",
			isphuong: "",
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
				},
				{
					name: "Cấp quốc gia",
				},
				{
					name: "Cấp thành phố",
				},
				{
					name: "Chưa xếp hạng",
				},
			],
			disan: [
				{
					name: "Di tích lịch sử văn hóa",
				},
				{
					name: "Di tích kiến trúc nghệ thuật",
				},
				{
					name: "Danh lam thắng cảnh",
				},
				{
					name: "Di tích khảo cổ",
				},
				{
					name: "Di tích lịch sử cách mạng",
				},
			],
			lehoi: [
				{
					name: "Có lễ hội",
				},
				{
					name: "Không lễ hội",
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
		this.geolocate();
		this.markers = ditich;
		this.markersLoad = ditich;
	},
	created() {},
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
	},
	watch: {
		isquan() {
			this.dataPhuong = this.phuong.filter((e) => e.districtID == this.isquan);
		},
		isphuong() {
			this.check =
				this.dataPhuong.filter((e) => e.id == this.isphuong)[0].name +
				" - " +
				this.quan.filter((e) => e.id == this.isquan)[0].name;

			// search phương
			console.log(this.dataPhuong.filter((e) => e.id == this.isphuong)[0]);
			this.searchLocation(
				this.phuong.filter((e) => e.districtID == this.isquan)[0].name
			);
			let name = this.quan.filter((e) => e.id == this.isquan)[0].name;
			this.markers = this.dataditich.filter((e) => e.city == name);
			this.markersLoad = this.dataditich.filter((e) => e.city == name);
		},
		indexActive() {
			this.markers = this.dataditich.filter(
				(e) => e.simistorelocator_id == this.indexActive
			);
		},
		is_ditich() {
			this.searchLocation(
				this.phuong.filter((e) => e.districtID == this.isquan)[0].name
			);
			let name = this.quan.filter((e) => e.id == this.isquan)[0].name;
			this.markers = this.dataditich.filter(
				(e) => e.city == name && e.xep_hang == this.is_ditich
			);
			this.markersLoad = this.dataditich.filter(
				(e) => e.city == name && e.xep_hang == this.is_ditich
			);
		},
		is_disan() {
			this.searchLocation(
				this.phuong.filter((e) => e.districtID == this.isquan)[0].name
			);
			let name = this.quan.filter((e) => e.id == this.isquan)[0].name;
			this.markers = this.dataditich.filter(
				(e) =>
					e.city == name &&
					e.xep_hang == this.is_ditich &&
					e.loai_hinh == this.is_disan
			);
			this.markersLoad = this.dataditich.filter(
				(e) =>
					e.city == name &&
					e.xep_hang == this.is_ditich &&
					e.loai_hinh == this.is_disan
			);
		},
		is_lehoi() {
			this.searchLocation(
				this.phuong.filter((e) => e.districtID == this.isquan)[0].name
			);
			let name = this.quan.filter((e) => e.id == this.isquan)[0].name;
			this.markers = this.dataditich.filter(
				(e) =>
					e.city == name &&
					e.xep_hang == this.is_ditich &&
					e.loai_hinh == this.is_disan &&
					e.le_hoi == this.is_disan
			);
			this.markersLoad = this.dataditich.filter(
				(e) =>
					e.city == name &&
					e.xep_hang == this.is_ditich &&
					e.loai_hinh == this.is_disan &&
					e.le_hoi == this.is_disan
			);
		},
	},
};
</script>

<style></style>
