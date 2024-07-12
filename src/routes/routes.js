//Layouts
import { HeaderOnly } from '~/layouts';

import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live/Live';

//Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly }, //Layout thằng này chỉ có Header thôi
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.live, component: Live },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

//routes này chứa các tuyến đường Home thì đi đâu
// following thì đi đâu
