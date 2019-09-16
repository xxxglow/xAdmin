<template>
    <div>
        <el-row class="menu_page">
            <el-col :span="12">
                <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#324057"
                        text-color="#fff"
                        active-text-color="#409eff">
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                    <template v-for="item in items">
                        <el-submenu v-if="item.children" :index="item.path" :key="item.path" >
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                                <el-menu-item :index='citem.path' >
                                    <span solt="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>



                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "LeftMenu",
        data(){
            return{
                items:[
                    {
                        icon:"el-icon-money",
                        name: "资金管理",
                        path: "fund",
                        children: [
                            {
                                path:"/foundlist",
                                name: "资金流水"
                            }
                        ]
                    },
                    {
                        icon:"el-icon-user-solid",
                        name: "信息管理",
                        path: "info",
                        children: [
                            {
                                path:"/infoshow",
                                name: "个人信息"
                            }
                        ]
                    },
                    {
                        icon:"el-icon-notebook-1",
                        name: "博客",
                        path: "editor",
                        children: [
                            {
                                path:"/eCreate",
                                name: "创建"
                            },
                            {
                                path:"/eList",
                                name: "博客列表"
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
    }
    .el-menu {
        border: none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo {
        width: 35px;
    }
    .el-submenu .el-menu-item {
        min-width: 180px;
    }
</style>
