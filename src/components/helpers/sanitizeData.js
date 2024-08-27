const backendFields = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    password: false,
    totalBalance: true,
    aadhaarCard: false,
    panCard: false,
    isActive: true,
    status: false
  };
  
  const isToBeIncluded = (field, fieldsToInclude) => {
    return fieldsToInclude[field] || false;
  };
  
  export const sanitizeCustomerData = (customers, fieldsToInclude) => {
    return customers.map(customer => {
      const sanitizedCustomer = {};
  
      for (const key in customer) {
        if (isToBeIncluded(key, fieldsToInclude)) {
          sanitizedCustomer[key] = customer[key];
        }
      }
  
      return sanitizedCustomer;
    });
  };
  