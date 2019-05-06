export const CLASSES = [
    {
        name: 'Account',
        properties: [
            {
                name: 'ScriptHash',
                description: '获得该合约账户的脚本散列'
            },
            {
                name: 'Votes',
                description: '获得该合约账户投给其它人的的投票信息'
            }
        ],
        methods: [
            {
                name: 'GetBalance',
                description: '通过资产 ID 获得该账户中这种资产的余额'
            }
        ]
    },
    {
        name: 'Asset',
        properties: [
            {
                name: 'Admin',
                description: '获得该资产的管理员（合约地址），有权对资产的属性（如总量，名称等）进行修改'
            },
            {
                name: 'Amount',
                description: '获得该资产的总量'
            },
            {
                name: 'AssetId',
                description: '获得该资产的 ID'
            },
            {
                name: 'AssetType',
                description: '获得该资产的类别'
            },
            {
                name: 'Available',
                description: '获得该资产的已经发行出去的数量'
            },
            {
                name: 'Issuer',
                description: '获得该资产的发行人（合约地址），有权进行资产的发行'
            },
            {
                name: 'Owner',
                description: '获得该资产的所有人（公钥）'
            },
            {
                name: 'Precision',
                description: '获得该资产的精度（最小分割数量），单位为小数点之后的位数'
            }
        ],
        methods: [
            {
                name: 'create',
                description: '通过资产 ID 获得该账户中这种资产的余额'
            }
        ]
    }
];