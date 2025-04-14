import React from 'react';
import logo from "../assets/logo.svg"; // Adjust the path to your logo image
const Footer = () => {
    const linkSections = [
        {
            "title": "Liên Kết Nhanh",
            "links": ["Trang Chủ", "Bán Chạy Nhất", "Ưu Đãi & Khuyến Mãi", "Liên Hệ", "Câu Hỏi Thường Gặp"]
        },
        {
            "title": "Cần Giúp Đỡ?",
            "links": ["Thông Tin Giao Hàng", "Chính Sách Đổi Trả & Hoàn Tiền", "Phương Thức Thanh Toán", "Theo Dõi Đơn Hàng", "Liên Hệ"]
        },
        {
            "title": "Theo Dõi Chúng Tôi",
            "links": ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/20">
            <div className="flex flex-row items-center justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div className="w-1/4">
                    <img className="w-32" src={logo} alt="dummyLogoColored" />
                    <p className="mt-6 text-sm">Chúng tôi giao hàng tạp hóa và đồ ăn nhẹ tươi ngon đến tận nhà bạn. Được hàng ngàn người tin dùng, chúng tôi mong muốn làm cho trải nghiệm mua sắm của bạn trở nên đơn giản và giá cả phải chăng.?</p>
                </div>
                <div className="flex flex-row justify-between w-3/4 gap-8">
                    {linkSections.map((section, index) => (
                        <div key={index} className="flex-1">
                            <h3 className="font-semibold text-base text-gray-900 mb-5">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Rất vui được phục vụ bạn! 
            </p>
        </div>
    );
};

export default Footer;