import ModalLayout from "../../../Modal/AddModalLayout";
import {FieldValues, UseFormRegister} from "react-hook-form";

export default function AddModalLayout({onSubmit, register, close}: {onSubmit: any,  register:UseFormRegister<FieldValues>, close:any}) {
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
                    <label className="w-1/4">Part Type : </label>
                    <input
                        type="text" // Tambahkan atribut type dengan nilai "date"
                        {...register("partType")} // Ganti "id_part" dengan "date" atau nama yang sesuai
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
            </div>
        </ModalLayout>
    );
}
