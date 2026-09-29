import jsPDF from "jspdf";

export function generateReceipt(order) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // --------------------------------
  // HEADER
  // --------------------------------

  doc.setFont("times", "bold");
  doc.setFontSize(24);

  doc.text("SAURABHYA", pageWidth / 2, 25, {
    align: "center",
  });

  doc.setFont("times", "normal");
  doc.setFontSize(9);

  doc.text(
    "Where Memories Become Fragrance",
    pageWidth / 2,
    33,
    {
      align: "center",
    },
  );

  // --------------------------------
  // TITLE
  // --------------------------------

  doc.setFont("times", "bold");
  doc.setFontSize(16);

  doc.text("ORDER RECEIPT", pageWidth / 2, 48, {
    align: "center",
  });

  // --------------------------------
  // ORDER INFORMATION
  // --------------------------------

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `Order Number: #${order._id
      .slice(-8)
      .toUpperCase()}`,
    20,
    65,
  );

  doc.text(
    `Date: ${new Date(order.createdAt).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    )}`,
    20,
    72,
  );

  doc.text(
    `Payment Method: ${order.paymentMethod}`,
    20,
    79,
  );

  doc.text(`Status: ${order.status}`, 20, 86);

  // --------------------------------
  // DIVIDER
  // --------------------------------

  doc.line(20, 93, pageWidth - 20, 93);

  // --------------------------------
  // CUSTOMER
  // --------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("CUSTOMER", 20, 105);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const shipping = order.shippingAddress;

  doc.text(shipping.name, 20, 114);
  doc.text(shipping.phone, 20, 121);

  doc.text(shipping.address, 20, 128);

  doc.text(
    `${shipping.city}, ${shipping.state} - ${shipping.pincode}`,
    20,
    135,
  );

  // --------------------------------
  // ITEMS
  // --------------------------------

  doc.line(20, 143, pageWidth - 20, 143);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("ITEMS", 20, 155);

  let y = 167;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  order.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    doc.setFont("helvetica", "bold");

    doc.text(item.name, 20, y);

    doc.setFont("helvetica", "normal");

    doc.text(
      `${item.quantity} × ₹${item.price.toLocaleString(
        "en-IN",
      )}`,
      20,
      y + 6,
    );

    doc.text(
      `₹${itemTotal.toLocaleString("en-IN")}`,
      pageWidth - 20,
      y,
      {
        align: "right",
      },
    );

    y += 18;
  });

  // --------------------------------
  // TOTAL
  // --------------------------------

  doc.line(20, y, pageWidth - 20, y);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text("TOTAL", 20, y);

  doc.text(
    `₹${order.totalAmount.toLocaleString("en-IN")}`,
    pageWidth - 20,
    y,
    {
      align: "right",
    },
  );

  // --------------------------------
  // FOOTER
  // --------------------------------

  y += 25;

  doc.setFont("times", "italic");
  doc.setFontSize(11);

  doc.text(
    "Thank you for choosing SAURABHYA.",
    pageWidth / 2,
    y,
    {
      align: "center",
    },
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
    "Where memories become fragrance.",
    pageWidth / 2,
    y + 8,
    {
      align: "center",
    },
  );

  // --------------------------------
  // DOWNLOAD
  // --------------------------------

  const orderNumber = order._id
    .slice(-8)
    .toUpperCase();

  doc.save(`SAURABHYA-Receipt-${orderNumber}.pdf`);
}