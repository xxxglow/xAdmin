<template>
    <div class="createPost-container">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

            <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                Publish
            </el-button>
            <div class="createPost-main-container">

                <el-form-item style="margin-bottom: 40px;"
                              label-width="70px"
                              prop="title"
                              label="Title:">
                    <el-input v-model="postForm.title"
                              :rows="1" type="textarea"
                              class="article-textarea"
                              autosize placeholder="Please enter the title"/>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;"
                              label-width="70px"
                              prop="author"
                              label="Author:">
                    <el-input v-model="postForm.author"
                              :rows="1" type="textarea"
                              class="article-textarea"
                              autosize placeholder="Please enter the author"/>

                </el-form-item>

                <el-form-item prop="content" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" v-model="postForm.content" :height="400"/>
                </el-form-item>

<!--                <el-form-item prop="image_uri" style="margin-bottom: 30px;">-->
<!--                    <Upload v-model="postForm.image_uri" />-->
<!--                </el-form-item>-->
            </div>
        </el-form>
    </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'


    const defaultForm = {
        title: '',
        author: '',
        content: '', // 文章内容
        image_uri: '', // 文章图片
    }

    export default {
        name: 'ArticleDetail',
        components: {Tinymce},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                postForm: Object.assign({}, defaultForm),
                loading: false,
                rules: {
                    title: [
                        {
                            required: true,
                            message: "title为必传项",
                            trigger: "blur"
                        },
                        {min: 2, max: 30, message: "长度在2到30字符", trigger: "blur"}
                    ],
                    author: [
                        {required: true, message: "作者不能为空", trigger: "blur"}
                    ]
                }
            }
        },
        computed: {},
        created() {
            if (this.isEdit) {

                const id = this.$route.params && this.$route.params.id
                this.fetchData(id)
            } else {
                this.postForm = Object.assign({}, defaultForm)
            }
        },
        methods: {
            fetchData(id) {

                this.$axios.get('/api/text/' + id).then(res => {
                    // console.log("res",res)
                    this.postForm = res.data.obj
                })
            },

            submitForm() {
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        const url = this.isEdit == "false" ? "add" : `edit/${this.postForm._id}`
                        this.$axios.post(`/api/text/${url}`, this.postForm)
                            .then(res => {
                                this.$notify({
                                    title: '成功',
                                    message: '发布文章成功',
                                    type: 'success',
                                    duration: 2000
                                })
                            });
                        this.loading = false
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            draftForm() {
                if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
                    this.$message({
                        message: '请填写必要的标题和内容',
                        type: 'warning'
                    })
                    return
                }
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.postForm.status = 'draft'
            },
            getRemoteUserList(query) {
                searchUser(query).then(response => {
                    if (!response.data.items) return
                    this.userListOptions = response.data.items.map(v => v.name)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";

    .createPost-container {
        position: relative;

        .createPost-main-container {
            padding: 40px 45px 20px 50px;

            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;

                .postInfo-container-item {
                    float: left;
                }
            }
        }

        .word-counter {
            width: 40px;
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }

    .article-textarea /deep/ {
        textarea {
            padding-right: 40px;
            resize: none;
            border: none;
            border-radius: 0px;
            border-bottom: 1px solid #bfcbd9;
        }
    }
</style>
