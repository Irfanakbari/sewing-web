"use client";
import React, {useEffect, useState} from "react";
import {BiPlusMedical, BiRefresh, BiTrash} from "react-icons/bi";
import {message, Table} from "antd";
import {useForm} from "react-hook-form";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useTabStore, {TabStore} from "@/app/context/Tab/TabStore";
import useStore from "@/app/context/Tab/useStore";
import AddModalLayout from "@/app/components/Pages/Master/Part/AddModal";
import {ColumnsType} from "antd/es/table";
import PrintAll from "@/app/components/Pages/Master/Part/Print/PrintAll";

export default function Part() {
  const [data, setData] = useState<any>({})
  const [dataMaterial, setDataMaterial] = useState<any>({})
  const [listBom, setListBom] = useState<any>([])
  const [modal, setModal] = useState(false)
  const tabStore : TabStore| any = useStore(useTabStore, (state) => state)
  const [messageApi, contextHolder] = message.useMessage();
  const [selected, setSelected] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading1, setLoading] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    reset,control
  } = useForm()
  const axiosInstance = useAxiosAuth()


  useEffect(() => {
    setLoading(false)
    tabStore?.addTab({
      label: 'Master Part',
      path: '/part',
      id: 'Master Part'
    })
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/parts',{
        // id: 'Master Part'
        cache:false
      });
      setData(response.data)
      const response2 = await axiosInstance.get('/materials',{
        // id: 'Master Material'
        cache:false
      });
      const formattedDatas = response2.data.data.map((data: any) => ({
        label: data.partNumber,
        value: data.id,
        desc: data.partName
      }));
      setDataMaterial(formattedDatas)
    } catch (error) {
      console.log(error)
      messageApi.open({
        type: 'error',
        content: 'Gagal Mengambil Data',
      });
    } finally {
      setLoading(false)
    }
  };

  const onChange = (pagination: any) => {
    setLoading(true);

    const url = `/parts?page=${pagination.current}&limit=${pagination.pageSize}`;
    axiosInstance.get(url,{
      id: 'Master Part'
    })
        .then(response => {
          setData(response.data);
        })
        .catch(() => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Mengambil Data',
          });
        })
        .finally(() => {
          setLoading(false);
        });

  };

  const submitImport = (data: any) => {
    const datas = {
      part_project: data.partProject,
      part_no: data.partNumber,
      part_name: data.partName,
      supplier: data.supplier,
      materials: listBom.map((material: any) => ({
        material_id: material.id,
        quantity: parseInt(material.quantity),
        unit: material.unit
      }))
    }
    // const formData = new FormData();
    // formData.append("file", data.file[0]); // "excel_file" harus sesuai dengan nama field pada backend yang menerima file Excel
    axiosInstance
        .post('/parts', datas,{
          cache: {
            update: {
              'Master Part': 'delete'
            }
          }
          // headers: {
          //   'Content-Type': 'multipart/form-data', // Pastikan header Content-Type diatur ke 'multipart/form-material'
          // }
        })
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Import Sukses',
          });
          fetchData();
        })
        .catch((e) => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Import Data',
          });
        })
        .finally(() => {
          setModal(false);
          reset();
        });
  };


  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'index',
      fixed: 'left',
      render: (_: any, __: any, index: any) => (data.currentPage - 1) * data.limit + index + 1,
      width: 50
    },
    {
      title: 'Part Project',
      fixed: 'left',
      dataIndex: 'partProject',
      width: 150,
    },
    {
      title: 'Part Number',
      fixed: 'left',
      dataIndex: 'partNumber',
      width: 150,
    },
    {
      title: 'Part Name',
      dataIndex: 'partName',
      width: 250,
    },
    {
      title: 'Supplier',
      width: 130,
      dataIndex: 'supplier',
    },
  ];
  const expandedRowRender2 = (record:any) => {
    const columns : ColumnsType<any> = [
      {
        title: 'Part Type',
        fixed: 'left',
        dataIndex: 'partType',
        render: (value, record, index) => record.material.partType,
        width: 150,
      },
      {
        title: 'Part Number',
        dataIndex: 'partNumber',
        render: (value, record, index) => record.material.partNumber,

        width: 120,
      },
      {
        title: 'Part Name',
        dataIndex: 'partName',
        render: (value, record, index) => record.material.partName,
        width: 250,
      },
      {
        title: 'Supplier',
        dataIndex: 'supplier',
        render: (value, record, index) => record.material.supplier,
        width: 100,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (value, record, index) => `${record.quantity} ${record.unitOfMeasure}`,
        width: 100,
      },
    ];
    return <Table bordered={true}
                  rowKey={'dest'}
                  columns={columns} dataSource={record.BOM} pagination={false} />;
  };
  const handleRowSelection = (selectedRowKeys: any, selectedRows: any) => {
    setSelected(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  function deleteData() {
    axiosInstance
        .delete('/parts/' + selectedRowKeys[0],{
          cache: {
            update: {
                'Master Part': 'delete'
            }
          }
        })
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Hapus Data Sukses',
          });
          fetchData();
        })
        .catch((e) => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Hapus Data',
          });
        })
        .finally(() => {
          // setModal(false);
          reset();
          setSelectedRowKeys([])
        });
  }

  return (
    <>
      {contextHolder}
      <div className={`bg-white h-full flex flex-col`}>
        {modal && (
          <AddModalLayout control={control} close={() => setModal(false)} onSubmit={handleSubmit(submitImport)}
                          register={register} options={dataMaterial} listBOM={listBom} setListBOM={setListBom}/>)}

        <div className="w-full bg-base py-0.5 px-1 text-white flex flex-row">
          <div
              onClick={() => setModal(true)}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiPlusMedical size={12}/>
            <p className="text-white font-bold text-sm">Baru</p>
          </div>
          <div
              onClick={fetchData}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiRefresh size={12}/>
            <p className="text-white font-bold text-sm">Refresh</p>
          </div>
          <div
              onClick={deleteData}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiTrash size={12}/>
            <p className="text-white font-bold text-sm">Hapus Data</p>
          </div>
          {
              selected.length > 0 && <PrintAll data={selected ?? []}/>
          }
        </div>
        <div className="w-full bg-white p-2 flex-grow overflow-hidden z-auto">
          <Table
              loading={loading1}
              bordered
              rowSelection={{
                // checkStrictly:true,
                selectedRowKeys,
                onChange: handleRowSelection,
                preserveSelectedRowKeys: true
              }}
              scroll={{
                y: "65vh"
              }}
              onChange={onChange}
              rowKey={'id'} columns={columns}
              dataSource={data.data}
              size={'small'}
              rowClassName="editable-row"
              expandable={{
                expandedRowRender: (record) => expandedRowRender2(record),
              }}
              pagination={{
                total: data['totalData'],
                defaultPageSize: 100,
                hideOnSinglePage: true,
                pageSizeOptions: [100, 300, 500, 1000, 2000],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
            />
        </div>
      </div>
    </>
  );
}
