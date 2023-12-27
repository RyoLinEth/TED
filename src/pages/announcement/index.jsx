const Announcement = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '1000',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 灰色背景
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '50%',
                    height: '50%',
                    backgroundColor: 'white', // 白色背景
                    borderRadius: '10px', // 可选的圆角样式
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // 可选的阴影效果
                    padding: '20px'
                }}
            >
                TED 通知
                <br />
                TED DApp 将于本日进行矿机合约升级
                <br />
                本次升级完成合约安全性升级
                <br />
                升级后将平移现有资料 请耐心等待
            </div>
        </div>
    );
}
export default Announcement;