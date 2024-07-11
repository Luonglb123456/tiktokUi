import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}
//Nội dung content thay đổi được lấy từ bên ngoài vào nên tạm để là children

export default HeaderOnly;
