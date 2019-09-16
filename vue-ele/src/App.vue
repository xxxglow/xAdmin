<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode'

    export default {
        // 在HTML模板渲染前调用created
        created() {
            if (localStorage.eleToken) {
                const decode = jwt_decode(localStorage.eleToken);
                this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
                this.$store.dispatch("setUser", decode);
            }
        },
        methods: {
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>

<style>

    /*
    <!--  register页面不显示，加了html,body之后就正常显示了，不知道什么原因-->
    */
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
    }

</style>
