import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 12,
		fontFamily: 'Helvetica',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	section: {
		marginBottom: 15,
	},
	heading: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 6,
		borderBottom: '1 solid #ccc',
		paddingBottom: 3,
	},
	textRow: {
		marginBottom: 4,
	},
	tableHeader: {
		flexDirection: 'row',
		borderBottom: '1 solid #ccc',
		paddingBottom: 4,
		marginBottom: 4,
		fontWeight: 'bold',
	},
	tableRow: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	col1: { width: '40%' },
	col2: { width: '20%' },
	col3: { width: '20%' },
	col4: { width: '20%' },
	totalRow: {
		marginTop: 10,
		textAlign: 'right',
		fontSize: 14,
		fontWeight: 'bold',
	},
})

const ReceiptDocument = ({ orderId, items, user }) => {
	const { created_at, status, address } = items[0]

	const totalAmount = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<Text style={styles.title}>Order Receipt</Text>

				<View style={styles.section}>
					<Text style={styles.heading}>Order Details</Text>
					<Text style={styles.textRow}>Order ID: {orderId}</Text>
					<Text style={styles.textRow}>
						Date: {new Date(created_at).toLocaleDateString()}
					</Text>
					<Text style={styles.textRow}>Status: {status}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.heading}>Shipping Details</Text>
					<Text style={styles.textRow}>
						Name: {user.firstName} {user.lastName}
					</Text>
					<Text style={styles.textRow}>Phone: {user.phone}</Text>
					<Text style={styles.textRow}>Email: {user.email}</Text>
					<Text style={styles.textRow}>Address: {address}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.heading}>Order Summary</Text>

					<View style={styles.tableHeader}>
						<Text style={styles.col1}>Product</Text>
						<Text style={styles.col2}>Price</Text>
						<Text style={styles.col3}>Qty</Text>
						<Text style={styles.col4}>Total</Text>
					</View>

					{items.map((item, i) => (
						<View style={styles.tableRow} key={i}>
							<Text style={styles.col1}>{item.product_name}</Text>
							<Text style={styles.col2}>₹{item.price}</Text>
							<Text style={styles.col3}>{item.quantity}</Text>
							<Text style={styles.col4}>
								₹{(item.price * item.quantity).toFixed(2)}
							</Text>
						</View>
					))}

					<Text style={styles.totalRow}>Total: ₹{totalAmount.toFixed(2)}</Text>
				</View>
			</Page>
		</Document>
	)
}

export default ReceiptDocument