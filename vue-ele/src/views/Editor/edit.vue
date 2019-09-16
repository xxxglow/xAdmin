<template>
    <div>
        <article-detail :is-edit="true" />
    </div>
</template>

<script>
    import ArticleDetail from './components/ArticleDetail'

    export default {
        name: 'EditForm',
        components: { ArticleDetail }
    }
</script>

