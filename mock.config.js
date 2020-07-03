/** 
 * mock配置说明
 * @param baseDir mock文件存放目录
 * @param defaultFileName 默认缺省文件名称
 * @param dirs 请求对象数列
 *              @param type 请求方法
 *              @param url 请求路径
 *              @param [fileName] 存放mock数据的文件名称，非必填（若路径末尾不是文件，默认使用defaultFileName)
*/
module.exports = {
  baseDir: './mock',
  defaultFileName: 'main.json',
  dirs: [
    {
      type: 'post',
      url: '/auth/login.json',
    }, {
      type: 'post',
      url: '/auth/register.json',
    }, {
      type: 'get',
      url: '/peopleList/createSession/:id',
      fileName: 'addSession.json',
    }, {
      type: 'get',
      url: '/getOnlineUsers.json',
    }, {
      type: 'get',
      url: '/chatMain/getSessionList.json',
    }, {
      type: 'get',
      url: '/chatMain/getMessages.json',
    }, {
      type: 'get',
      url: '/example',
    },
  ]
}