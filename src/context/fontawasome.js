//Khởi tạo thư viện icon của riêng bạn
import { library } from '@fortawesome/fontawesome-svg-core'; 

//Import các icon mà bạn muốn sử dụng trong từng gói
// import { faMoneyBill } from '@fortawesome/pro-solid-svg-icons';
import { faBars,faArrowRight,faHouse,faUser,faNewspaper,faGift,faAngleUp } from '@fortawesome/free-solid-svg-icons';  
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'

//Add các icon đã được import vào trong thư viện của bạn
library.add(fab, faBars,faArrowRight,faHouse,faUser,faNewspaper,faGift,faAngleUp )