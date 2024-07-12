//Routes liên quan đến cấu hình
// dùng để define các tuyến đường
//vì khi nhấn logo => về trang chủ hoặc nhấn nút khác cũng về trang chủ
//=> hard code to='/' => ko tối ưu => cần phải define lại các tuyến đường

const routes = {
    home: '/',
    following: '/following',
    profile: '/:nickname',
    upload: '/upload',
    search: '/search',
    live: '/live',
};
export default routes;
