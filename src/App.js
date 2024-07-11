import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
//Giải thích code dòng 11: Mong muốn là những thằng route ko có key là 'layout' thì sẽ mặc định là DefaultLayout
//Layout đã ôm các Page (DefaulLayout ôm rồi) => Page trở thành children cuar DefaultLayout => sau đó đc lưu vào phần content

//nếu layout === null thì nó 1 mình 1 layout nên chỉ cần tạo ra 1 thẻ chứa nó thôi mà ko cần gì cả
// Upload page ko còn header và sidebar
