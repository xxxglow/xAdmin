<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true" :model="search_data" class="demo-form-inline" >
                <el-form-item label="投标时间筛选">
                    <el-date-picker
                            v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                    --
                    <el-date-picker
                            v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click='handleSearch'>筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button
                            type="primary"
                            size="small"
                            icon="view"
                            v-if="user.identity == 'manager'"
                            @click="onAddMoney">
                        添加
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                    v-if="tableData.length>0"
                    :data="tableData"
                    max-height="450"

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
                        prop="type"
                        label="收支类型"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="收支描述"
                        align='center'
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="income"
                        label="收入"
                        align='center'
                        width="170">
                    <template slot-scope="scope">
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>


                </el-table-column>
                <el-table-column
                        prop="expend"
                        label="支出"
                        align='center'
                        width="170">
                    <template slot-scope="scope">
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cash"
                        label="账户现金"
                        align='center'
                        width="170">
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注"
                        align='center'
                        width="220">
                </el-table-column>
                <el-table-column
                        label="操作"
                        prop="operation"
                        align="center"
                        fixed="right"
                        width="180"
                        v-if="user.identity == 'manager'">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="warning"
                                icon="edit"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                icon="delete"
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

        <!--        添加弹框-->
        <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
    </div>
</template>

<script>
    import DialogFound from "../components/DialogFound";

    export default {
        name: "FundList",
        components: {DialogFound},
        data() {
            return {

                search_data: {
                    startTime: '',
                    endTime: ''
                },
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
                },
                form: {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
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
                this.$axios.get('api/profiles').then(res => {
                    // console.log(res)
                    this.allTableData = res.data;
                    this.filterTableData = res.data;

                    // 设置分页数据
                    this.setPagination();
                })
                    .catch(err => console.log(err))
            },
            onAddMoney() {
                // 添加
                this.dialog = {
                    show: true,
                    title: "添加资金信息",
                    option: "add"
                };
                this.form = {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                }
            },
            handleEdit(row) {
                // 编辑
                this.dialog = {
                    show: true,
                    title: "编辑资金信息",
                    option: "edit"
                };
                this.form = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(row) {
                // 删除
                this.$axios.delete(`api/profiles/delete/${row._id}`).then(res => {
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

    .btnRight {
        float: right;
    }

    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
