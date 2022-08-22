<template>
	<header class="site-header">
		<div class="site-header-container">
			<div class="header-menu">
				<ul v-if="urlLink">
					<li class="">
						<router-link tag="a" :to="urlLink.THAMQUAN"
							>Tham quan ảo
						</router-link>
					</li>
					<li class="">
						<router-link tag="a" :to="urlLink.DITICH">Di Tích </router-link>
					</li>
					<li class="">
						<router-link tag="a" :to="urlLink.DISAN"
							>Di sản văn hóa
						</router-link>
					</li>
				</ul>
				<!-- <ul v-if="urlLink">
					<li style="color:white">{{ $route.params.maptype }}</li>
					<li class="">
						<router-link :to="{ name: 'Home', params: { maptype: 'disanvanhoa' }}">Di sản văn hóa</router-link>
					</li>
					<li class="">
						<router-link :to="{ name: 'Home', params: { maptype: 'ditich' }}">Di tích</router-link>
					</li>
					<li class="">
						<router-link :to="{ name: 'Home', params: { maptype: 'thamquanao' }}">Tham quan ảo</router-link>
					</li>
				</ul>
				<ul v-if="urlLink">
					<li class="">
						<a :href="'/ban-do-so' +urlLink.DISAN">
							Di sản văn hóa
						</a>
					</li>
					<li class="">
						<a :href="'/ban-do-so' +urlLink.DITICH">Di Tích </a>
					</li>
					<li class="">
						<a :href="'/ban-do-so' +urlLink.THAMQUAN"
							>Tham quan ảo
						</a>
					</li>
				</ul> -->
			</div>
		</div>
	</header>
</template>

<script>
	import { ROUTE_MAP } from "@/utils/constants";
	const router = ROUTE_MAP;
	export default {
		data() {
			return {
				urlLink: router,
			};
		}
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
		margin: 0 10px;
	}
	.header-menu ul li a {
		margin: 0;
		padding: 8px 30px;
		min-width: 210px;
		font-weight: 400;
		text-align: center;
		border-radius: 3px;
		color: #fff;
		transition: all 0.35s ease-in;
	}
	.header-menu ul li a:hover,
	.header-menu ul li a.router-link-active {
		transition: all 0.35s ease-out;
		background-color: #90080e;
		color: #fff;
	}
</style>
