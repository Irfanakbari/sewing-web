import React, {useContext, useRef, useState} from 'react';
import type {GetRef} from 'antd';
import {Button, Form, Input, Table} from 'antd';

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    id: string;
    partNumber: string;
    partName: string;
    quantity: number;
    unit: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       title,
                                                       editable,
                                                       children,
                                                       dataIndex,
                                                       record,
                                                       handleSave,
                                                       ...restProps
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    // useEffect(() => {
    //     if (editing) {
    //         inputRef.current!.focus();
    //     }
    // }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    id: string;
    partNumber: string;
    partName: string;
    quantity: number;
    unit: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const BomModal= ({dataSource, setDataSource, selected}: any) => {
    // const [dataSource, setDataSource] = useState<DataType[]>([
    //     {
    //         id: '0',
    //         partNumber: 'xe3e3e3e33e3',
    //         partName: 'Edward King 0',
    //         quantity: 30,
    //         unit: 'Pcs'
    //     },
    // ]);

    const [count, setCount] = useState(2);

    const handleDelete = (id: string) => {
        const newData = dataSource.filter((item: { id: string; }) => item.id !== id);
        setDataSource(newData);
    };

    const defaultColumns: (any[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Part Number',
            dataIndex: 'partNumber',
            editable: false,
        },
        {
            title: 'Part Name',
            dataIndex: 'partName',
            editable: false,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            editable: true,
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: DataType) =>
                dataSource.length >= 1 ? (
                        <a onClick={(e)=>{
                            e.preventDefault();
                            handleDelete(record.id);
                        }}>Delete</a>
                ) : null,
        },
    ];

    const handleAdd = () => {

        const newData: DataType =  {
                id: selected.value,
                partNumber: selected.label,
                partName: selected.desc,
                quantity: 0,
                unit: 'Pcs'
            };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div className={`w-full`}>
            <Button onClick={handleAdd} style={{ marginBottom: 16 }}>
                Tambah Material
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default BomModal;