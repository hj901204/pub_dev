import BusinessUrls from './BusinessUrls';
import CustomerUrls from './CustomerUrls';
import SupplierUrls from './SupplierUrls';

const RenterUrls = {
    ...BusinessUrls,
    ...CustomerUrls,
    ...SupplierUrls,
}
export { RenterUrls, BusinessUrls, CustomerUrls, SupplierUrls};