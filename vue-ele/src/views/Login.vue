<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">网站后台管理系统</span>
                <el-form :model="loginUser" status-icon :rules="rules" ref="loginFrom" label-width="60px"
                         class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginFrom')">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在
                            <router-link to='/register'>注册</router-link>
                        </p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode'

    export default {
        name: 'login',
        components: {},
        data() {

            return {
                loginUser: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        {
                            type: "email",
                            required: true,
                            message: "邮箱格式不正确",
                            trigger: "change"
                        }
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur"}
                    ]
                }

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios
                            .post('/api/users/login', this.loginUser)
                            .then(res => {
                                // console.log(res);
                                // token
                                const {token} = res.data;
                                // 存储到ls
                                localStorage.setItem('eleToken', token);

                                // 解析token
                                const decode = jwt_decode(token);
                                // 存储数据
                                this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
                                this.$store.dispatch("setUser", decode);

                                // 页面跳转
                                this.$router.push('/index');

                                this.$message({
                                    message: "登录成功",
                                    type: "success"
                                })
                            });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            isEmpty(value) {
                return (
                    // 经过Trim()去掉字符串两边的空格
                    value === undefined || value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && String.trim().length ===0)
                );
            }
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat center center;
        background-size: 100% 100%;
    }

    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .form_container .manage_tip .title {
        font-family: 'Microsoft YaHei';
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        /*background-color: #fff;*/
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }

    .tiparea p a {
        color: #409eff;
    }
</style>
