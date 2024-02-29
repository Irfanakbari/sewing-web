const master: Menu[] = [
    {
        key: 'Master Material',
        label: 'Master Material',
        path: '/material'
    },
    {
        key: 'Master Part',
        label: 'Master Part',
        path: '/part'
    },
]

const laporan: Menu[] = [
    {
        key: 'Riwayat Scan',
        label: 'Riwayat Scan',
        path: '/history'
    },
]


export interface Menu {
    key: string,
    label: string,
    path?: string,
}

export {master,laporan}