// eslint-disable-next-line no-undef
module.exports = {
	publicPath: './',
	devServer: {
		open: true,
		port: 9999,
		proxy:{
			'/':{
				target: 'http://127.0.0.1:8888', 
				changeOrigin : true,   //允许跨域
				pathRewrite: {
				}
			},
		},
	},
	css:{
		loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/components/stylus/variables.styl'
      }
    }
	}
}