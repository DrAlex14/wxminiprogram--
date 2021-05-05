let ajaxTimes = 0;   //记发送请求次数
export const request = (params) => {
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    ajaxTimes ++;
    //显示加载中
    wx.showLoading({
        title: "加载中",
        mask: true,//蒙版
    });
      
    
    return new Promise((resolve,reject) => {
        wx.request({
            ...params,
            url:baseUrl + params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes --;
                if(ajaxTimes === 0){
                //关闭正在等待图标
                wx.hideLoading();
                }
            }
        })
    })
}