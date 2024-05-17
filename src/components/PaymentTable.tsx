import { COLORS } from '@/constants';
import { PaymentDataType } from '@/types/clientDetailsObj';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { formatDate } from './ScoreTable';


interface PaymentProps {
    payment: PaymentDataType[]
}

export enum Status {
    Success = "COMPLETED",
    Pending = "PENDING",
    Failed = "FAILED"
}

const getStatusTextColor = (status: string | undefined) => {
    switch (status) {
        case Status.Success:
        return 'rgba(211, 252, 202, 1)';
        case Status.Pending:
        return 'rgba(252, 250, 202, 1)';
        case Status.Failed:
        return 'rgba(252, 205, 202, 1)';
        default:
        return 'black';
    }
};

const getStatusBgColor = (status: string | undefined) => {
    switch (status) {
        case Status.Success:
        return 'rgba(3, 105, 32, 1)';
        case Status.Pending:
        return 'rgba(192, 161, 2, 1)';
        case Status.Failed:
        return 'rgba(236, 19, 19, 1)';
        default:
        return 'black';
    }
}

const PaymentTable = ({payment}: PaymentProps) => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
        {
            key: 1,
            name: '14/04/2023',
            calories: "$150.00",
            fat: "Pending",
        },
        {
            key: 2,
            name: '14/04/2023',
            calories: "$150.00",
            fat: "Failed",
        },
        {
            key: 3,
            name: '14/04/2023',
            calories: "$150.00",
            fat: "Successful",
        },
        {
            key: 4,
            name: '14/04/2023',
            calories: "$150.00",
            fat: "Pending",
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, payment?.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

  return (
    <ScrollView horizontal>
        <DataTable style={{width: "auto", flex: 1}}>
        <DataTable.Header style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
            <DataTable.Title textStyle={styles?.titleText}>Date</DataTable.Title>
            <DataTable.Title textStyle={styles?.titleText}>Amount</DataTable.Title>
            <DataTable.Title textStyle={styles?.titleText}>Status</DataTable.Title>
        </DataTable.Header>

        {payment?.slice(from, to)?.map((item, index) => (
            <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
            <DataTable.Cell textStyle={styles?.textColor}>{formatDate(item?.date)}</DataTable.Cell>
            <DataTable.Cell textStyle={styles?.textColor} >${item?.amount}</DataTable.Cell>
            <DataTable.Cell textStyle={{color: getStatusBgColor(item?.status), backgroundColor: getStatusTextColor(item?.status)  }} style={{ }}>{item?.status}</DataTable.Cell>
            </DataTable.Row>
        ))}

        <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(payment?.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${payment?.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            // paginationControlRippleColor="red"
            dropdownItemRippleColor="white"
            style={{justifyContent: "center", backgroundColor: COLORS?.primary, alignItems: "center"}}
            // label={}
        />
    </DataTable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    titleText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 10,
        textAlign: "left"
    },
    textColor: {
        color: "#000",
        fontSize: 12,
        textAlign: "left",
        // color: getStatusBgColor(item?.status) , 
        // backgroundColor: getStatusTextColor(item?.status)

    }
})

export default PaymentTable;