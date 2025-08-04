import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  qrImage: { width: 100, height: 100, marginTop: 10 },
});

const BookingPDF = ({ user, hotel, bookingId, qrImage }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Hotel Booking Confirmation</Text>
        </View>
        <View style={styles.section}>
          <Text>Name: {user?.name || "Guest"}</Text>
          <Text>Email: {user?.email || "guest@example.com"}</Text>
          <Text>Booking ID: {bookingId}</Text>
        </View>
        <View style={styles.section}>
          <Text>Hotel: {hotel.name}</Text>
          <Text>Location: {hotel.location}</Text>
        </View>
        {qrImage && (
          <View style={styles.section}>
            <Text>Scan QR Code:</Text>
            <Image style={styles.qrImage} src={qrImage} />
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BookingPDF;
