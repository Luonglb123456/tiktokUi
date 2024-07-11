import * as httpRequest from '~/utils/httpRequest'; //import file request thành 1 obj request
export const search = async (q, type = 'less') => {
    //dùng async là có 1 hàm promise rồi, đúng thì chạy vào try, ko thì vào catch, ko cần dùng .then .catch
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data; //trả về thẳng mảng kết quả tìm kiếm
    } catch (error) {
        console.log(error);
    }
};

//file request ở 1 file riêng chỉ làm nhiệm vụ gửi request thôi
//còn nhiệm vụ lấy api về là ở file này
//file này goi api ô search sau này sẽ có thêm file lấy api ở video chẳng hạn
