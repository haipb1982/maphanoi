<template>
	<header class="site-header">
		<div class="site-header-container">
			<div class="header-menu">
				<ul v-if="urlLink">
					<li class="">
						<router-link tag="a" :to="urlLink.DITICH">Di Tích </router-link>
					</li>
					<li class="">
						<router-link tag="a" :to="urlLink.DISAN"
							>Di sản văn hóa
						</router-link>
					</li>
					<li class="">
						<router-link tag="a" :to="urlLink.THAMQUAN"
							>Tham quan ảo
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script>
import { ROUTE_MAP } from "@/utils/constants";
import { mapGetters } from "vuex";
const router = ROUTE_MAP;
export default {
	data() {
		return {
			urlLink: router,
		};
	},
	mounted() {},
	methods: {
		showmenu() {
			this.$store.dispatch("ShowMenuBar");
		},
	},
	computed: {
		...mapGetters(["getInforUser"]),
	},
};
</script>

<style>
.site-header {
	background-color: #333333;
}
.header-menu {
	padding: 10px;
}
.header-menu ul {
	display: flex;
	align-items: center;
	justify-content: center;
}
.header-menu ul li {
	margin: 0 15px;
}
.header-menu ul li a {
	margin: 0;
	padding: 14px 40px;
  min-width: 200px;
  text-align: center;
	border-radius: 7px;
  color: #fff;
  transition: all .35s ease-in;
}
.header-menu ul li a:hover,
.header-menu ul li a.router-link-active {
  transition: all .35s ease-out;
	background-color: #90080e;
  color:#fff;
}
</style>
