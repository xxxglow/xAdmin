<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                    v-if="tableData.length>0"
                    :data="tableData"
                    max-height="450"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建日期"
                        align="center"
                        width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="作者"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="文章标题"
                        align='center'
                        min-width="300px">
                    <template slot-scope="{row}">
                        <router-link :to="'/edit/'+row._id" class="link-type">
                            <el-link :underline="false">{{ row.title }}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        prop="operation"
                        align="center"
                        fixed="right"
                        width="180"
                        v-if="user.identity == 'manager'">
                    <template slot-scope="scope">
                        <router-link :to="'/edit/'+scope.row._id">
                            <el-button
                                    type="primary"
                                    size="small"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.row)">编辑
                            </el-button>
                        </router-link>

                        <el-button
                                size="small"
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--        分页-->
        <div class="pagination">
            <el-pagination
                    v-if="pagination.total>0"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pagination.page_index"
                    :page-sizes="pagination.page_sizes"
                    :page-size="pagination.page_size"
                    :layout="pagination.layout"
                    :total="pagination.total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FundList",
        components: {},
        data() {
            return {
                form: {
                    title: "",
                    author: "",
                    id: ""
                },
                // 需要给分页组件传的信息
                pagination: {
                    page_index: 1,// 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 第一页显示多少条
                    page_sizes: [5, 10, 15, 20], // 每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },
                tableData: [],
                allTableData: [],
                filterTableData: []

            };
        },
        created() {
            this.getProfile()
        },
        computed:{
            user(){
                return this.$store.getters.user
            }
        },
        methods: {
            getProfile() {
                // 获取表格数据
                this.$axios.get('api/text').then(res => {
                    // console.log(res)
                    this.allTableData = res.data;
                    this.filterTableData = res.data;

                    // 设置分页数据
                    this.setPagination();
                })
                    .catch(err => console.log(err))
            },

            handleEdit(row) {
                // 编辑

            },
            handleDelete(row) {
                // 删除
                this.$axios.delete(`api/text/delete/${row._id}`).then(res => {
                    this.$message('删除成功');
                    this.getProfile();
                })
            },
            handleSizeChange(page_size) {
                // 切换size
                this.pagination.page_index = 1;
                this.pagination.page_size = page_size;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < page_size; // 返回所有小于page_size的元素
                });
            },
            handleCurrentChange(page) {
                // 当前页
                let sortnum = this.pagination.page_size * (page - 1);
                let table = this.allTableData.filter((item, index) => {
                    return index >= sortnum;
                });
                // 设置默认分页数据
                this.tableData = table.filter((item, index) => {
                    return index < this.pagination.page_size;
                });
            },
            setPagination() {
                // 总页数
                this.pagination.total = this.allTableData.length;
                this.pagination.page_index = 1;
                this.pagination.page_size = 5;
                // 设置默认分页数据
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.pagination.page_size;
                });
            },
            handleSearch() {
                // 筛选
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getProfile();
                    return;
                }
                const sTime = this.search_data.startTime.getTime();
                const eTime = this.search_data.endTime.getTime();

                this.allTableData = this.filterTableData.filter(item => {
                    let data = new Date(item.date);
                    let time = data.getTime();
                    return time >= sTime && time <= eTime;
                });

                console.log(this.allTableData);
                // 分页数据
                this.setPagination()

            }

        }

    }
</script>

<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }

    .link-type {
        color: #666;
        text-decoration: none;
    }

    .btnRight {
        float: right;
    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
