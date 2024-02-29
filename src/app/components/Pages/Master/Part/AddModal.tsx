import ModalLayout from "../../../Modal/AddModalLayout";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";
import {Select, SelectProps} from "antd";
import React, {useState} from "react";
import BomModal from "@/app/components/Pages/Master/Part/BomModal";

export default function AddModalLayout({onSubmit, register, close, options, control, listBOM, setListBOM}: {onSubmit: any,  register:UseFormRegister<FieldValues>, close:any,options: SelectProps['options'], control:  Control<FieldValues, any, FieldValues>, listBOM: any, setListBOM: any}) {
    const [selected, setSelected] = useState<any>({})
    return (
        <ModalLayout onSubmit={onSubmit} close={close}>
            <div className="border border-gray-300 w-full p-3 flex flex-col gap-3 text-sm">
                {/*<div className="flex flex-row w-full justify-between items-center gap-2">*/}
                {/*    <label className="w-1/4">File Excel : </label>*/}
                {/*    <input*/}
                {/*        type="file" // Tambahkan atribut type dengan nilai "file"*/}
                {/*        {...register("file")} // Ganti "id_part" dengan "excel_file" atau nama yang sesuai*/}
                {/*        className="border border-gray-300 p-1 flex-grow"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <label className="w-1/4">Part Project : </label>
                    <input
                        type="text" // Tambahkan atribut type dengan nilai "date"
                        {...register("partProject")} // Ganti "id_part" dengan "date" atau nama yang sesuai
                        className="border border-gray-300 p-1 flex-grow"
                    />
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <label className="w-1/4">Part Number : </label>
                    <input
                        type="text" // Tambahkan atribut type dengan nilai "date"
                        {...register("partNumber")} // Ganti "id_part" dengan "date" atau nama yang sesuai
                        className="border border-gray-300 p-1 flex-grow"
                    />
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <label className="w-1/4">Part Name : </label>
                    <input
                        type="text" // Tambahkan atribut type dengan nilai "date"
                        {...register("partName")} // Ganti "id_part" dengan "date" atau nama yang sesuai
                        className="border border-gray-300 p-1 flex-grow"
                    />
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <label className="w-1/4">Supplier : </label>
                    <input
                        type="text" // Tambahkan atribut type dengan nilai "date"
                        {...register("supplier")} // Ganti "id_part" dengan "date" atau nama yang sesuai
                        className="border border-gray-300 p-1 flex-grow"
                    />
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <label className="w-1/4">Bill Of Material : </label>
                    <div className="border border-gray-300 p-1 flex-grow">
                        <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="select list materials"
                            onChange={(value, option) => {
                                setSelected(option);
                            }}
                            value={selected}
                            optionLabelProp="label"
                            optionFilterProp={"label"}
                            options={options}
                            optionRender={(node) => {
                                return (
                                    <div>
                                        <p>{node.data.label}</p>
                                        <p>{node.data.desc}</p>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between items-center gap-2">
                    <BomModal selected={selected} dataSource={listBOM} setDataSource={setListBOM}/>
                </div>
            </div>
        </ModalLayout>
    );
}
