import { COLORS } from '@/constants';
import { DisputeAccountType } from '@/types/clientDetailsObj';
import * as React from 'react';
import { Text } from 'react-native';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

interface DisputeTableProps {
    disputeAccounts: DisputeAccountType[]
    isLoading: boolean,
    isError: boolean
}

const DisputeTable = ({disputeAccounts, isLoading, isError}: DisputeTableProps) => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    // console.log("disputeAcc", disputeAccounts)

    const [items] = React.useState([
        {
            key: 1,
            name: 'Dianne Russell',
            calories: "******* 6785",
            fat: "Experian",
        },
        {
            key: 2,
            name: 'Dianne Russell',
            calories: "******* 6785",
            fat: "Transunion",
        },
        {
            key: 3,
            name: 'Dianne Russell',
            calories: "******* 6785",
            fat: "Equifax",
        },
        {
            key: 4,
            name: 'Dianne Russell',
            calories: "******* 6785",
            fat: "Transunion",
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

  return (
    <ScrollView horizontal style={{}}>
        <DataTable style={{width: "auto", flex: 1, justifyContent: "center", alignItems: "center"}}>
        {
            isLoading ?
                <ActivityIndicator size={"large"} />
                :
                    isError ? 
                    <>
                        <Text>Something went wrong</Text>           
                    </>
                    :
                    <>
                        {
                            disputeAccounts?.length > 0 ?
                            <>
                                <DataTable.Header >
                                    <DataTable.Title textStyle={styles?.titleText}>Account Name</DataTable.Title>
                                    <DataTable.Title textStyle={styles?.titleText}>Account Number</DataTable.Title>
                                    <DataTable.Title textStyle={styles?.titleText}>Bureau</DataTable.Title>
                                    <DataTable.Title textStyle={styles?.titleText}>Balance</DataTable.Title>
                                </DataTable.Header>
                                {disputeAccounts?.slice(from, to).map((item, index) => (
                                        <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
                                        <DataTable.Cell textStyle={styles?.textColor}>{item?.accountName}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles?.textColor} >{item?.accountNumber}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles?.textColor}>{item?.bureau}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles?.textColor}>{item?.balance}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                                        onPageChange={(page) => setPage(page)}
                                        label={`${from + 1}-${to} of ${disputeAccounts?.length}`}
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
                            </> 
                                :
                            <>
                                <Text>No result found</Text>
                            </>
                        }
                    </>
                    
        }

        {/* {
            disputeAccounts?.length >= 0 ?
            <>
                {disputeAccounts?.slice(from, to).map((item, index) => (
                        <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start", width: "100%"}}>
                        <DataTable.Cell textStyle={styles?.textColor}>{item?.accountName}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles?.textColor} >{item?.accountNumber}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles?.textColor}>{item?.bureau}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles?.textColor}>{item?.balance}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${disputeAccounts?.length}`}
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
                </> 
                    :
                <>
                    <ActivityIndicator />
                </>
        } */}
    </DataTable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    titleText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 10,
        textAlign: "left",
    },
    textColor: {
        color: "#000",
        fontSize: 12,
        textAlign: "left"

    }
})

export default DisputeTable;