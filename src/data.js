// Fictional linked records for the revised professional ERD.
const data = {
  "date": "2026-11-19",
  "tenants": [
    {
      "id": "TN-001",
      "name": "مجموعة النور الطبية",
      "code": "ALNOUR",
      "status": "active",
      "created": "2026-03-12",
      "email": "info@alnour.example",
      "phone": "0233360011"
    },
    {
      "id": "TN-002",
      "name": "مجموعة الحياة الطبية",
      "code": "ALHAYAT",
      "status": "active",
      "created": "2026-06-08",
      "email": "info@alhayat.example",
      "phone": "0224020011"
    },
    {
      "id": "TN-003",
      "name": "مركز السلام الطبي",
      "code": "ALSALAM",
      "status": "inactive",
      "created": "2026-10-02",
      "email": "info@alsalam.example",
      "phone": "0237400011"
    }
  ],
  "clinics": [
    {
      "id": "CL-001",
      "tenantId": "TN-001",
      "name": "عيادة النور",
      "phone": "0233360011",
      "status": "active"
    },
    {
      "id": "CL-002",
      "tenantId": "TN-001",
      "name": "مركز النور للرعاية",
      "phone": "0224020033",
      "status": "active"
    },
    {
      "id": "CL-003",
      "tenantId": "TN-002",
      "name": "مركز الحياة",
      "phone": "0224020011",
      "status": "active"
    },
    {
      "id": "CL-004",
      "tenantId": "TN-003",
      "name": "عيادة السلام",
      "phone": "0237400011",
      "status": "inactive"
    }
  ],
  "branches": [
    {
      "id": "BR-001",
      "clinicId": "CL-001",
      "name": "الدقي",
      "address": "٢٤ شارع التحرير، الدقي، الجيزة",
      "phone": "0233360011",
      "status": "active",
      "tenantId": "TN-001",
      "timezone": "Africa/Cairo"
    },
    {
      "id": "BR-002",
      "clinicId": "CL-001",
      "name": "المهندسين",
      "address": "١٨ شارع جامعة الدول العربية، الجيزة",
      "phone": "0233450022",
      "status": "active",
      "tenantId": "TN-001",
      "timezone": "Africa/Cairo"
    },
    {
      "id": "BR-003",
      "clinicId": "CL-002",
      "name": "مدينة نصر",
      "address": "٣٢ شارع عباس العقاد، القاهرة",
      "phone": "0224020033",
      "status": "active",
      "tenantId": "TN-001",
      "timezone": "Africa/Cairo"
    },
    {
      "id": "BR-004",
      "clinicId": "CL-003",
      "name": "مصر الجديدة",
      "address": "١٠ شارع الأهرام، القاهرة",
      "phone": "0224020011",
      "status": "active",
      "tenantId": "TN-002",
      "timezone": "Africa/Cairo"
    },
    {
      "id": "BR-005",
      "clinicId": "CL-004",
      "name": "الهرم",
      "address": "٤٥ شارع الهرم، الجيزة",
      "phone": "0237400011",
      "status": "inactive",
      "tenantId": "TN-003",
      "timezone": "Africa/Cairo"
    }
  ],
  "users": [
    {
      "id": "U-001",
      "name": "أحمد محمد",
      "email": "ahmed@alnour.example",
      "status": "active"
    },
    {
      "id": "U-002",
      "name": "مريم حسن",
      "email": "mariam@alnour.example",
      "status": "active"
    },
    {
      "id": "U-003",
      "name": "د. خالد سمير",
      "email": "khaled@alnour.example",
      "status": "active"
    },
    {
      "id": "U-004",
      "name": "د. أحمد عادل",
      "email": "adel@alnour.example",
      "status": "active"
    },
    {
      "id": "U-005",
      "name": "د. سارة محمود",
      "email": "sara@alnour.example",
      "status": "active"
    },
    {
      "id": "U-006",
      "name": "عمر إبراهيم",
      "email": "omar@alnour.example",
      "status": "invited"
    },
    {
      "id": "U-007",
      "name": "د. يوسف حسن",
      "email": "youssef@alhayat.example",
      "status": "active"
    },
    {
      "id": "U-008",
      "name": "د. هبة سالم",
      "email": "heba@alsalam.example",
      "status": "inactive"
    }
  ],
  "tenantUsers": [
    {
      "id": "TU-001",
      "userId": "U-001",
      "tenantId": "TN-001",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-002",
      "userId": "U-002",
      "tenantId": "TN-001",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-003",
      "userId": "U-003",
      "tenantId": "TN-001",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-004",
      "userId": "U-004",
      "tenantId": "TN-001",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-005",
      "userId": "U-005",
      "tenantId": "TN-001",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-006",
      "userId": "U-006",
      "tenantId": "TN-001",
      "status": "invited",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-007",
      "userId": "U-007",
      "tenantId": "TN-002",
      "status": "active",
      "joinedAt": "2026-10-01"
    },
    {
      "id": "TU-008",
      "userId": "U-008",
      "tenantId": "TN-003",
      "status": "inactive",
      "joinedAt": "2026-10-01"
    }
  ],
  "roles": [
    {
      "id": "R-001",
      "name": "مدير العيادة",
      "scope": "العيادة وكل الفروع",
      "groups": [
        "patients",
        "doctors",
        "appointments",
        "visits",
        "billing",
        "reports",
        "settings",
        "users"
      ],
      "tenantId": null,
      "code": "R-001",
      "isSystem": true
    },
    {
      "id": "R-002",
      "name": "موظف استقبال",
      "scope": "فرع محدد",
      "groups": [
        "patients",
        "appointments",
        "visits"
      ],
      "tenantId": null,
      "code": "R-002",
      "isSystem": true
    },
    {
      "id": "R-003",
      "name": "طبيب",
      "scope": "الفروع المسندة",
      "groups": [
        "patients",
        "appointments",
        "visits"
      ],
      "tenantId": null,
      "code": "R-003",
      "isSystem": true
    },
    {
      "id": "R-004",
      "name": "محاسب",
      "scope": "العيادة وكل الفروع",
      "groups": [
        "billing",
        "reports"
      ],
      "tenantId": null,
      "code": "R-004",
      "isSystem": true
    }
  ],
  "userRoleAssignments": [
    {
      "id": "URA-1",
      "tenantUserId": "TU-001",
      "roleId": "R-001",
      "clinicId": "CL-001",
      "branchId": null
    },
    {
      "id": "URA-2",
      "tenantUserId": "TU-002",
      "roleId": "R-002",
      "clinicId": "CL-001",
      "branchId": "BR-001"
    },
    {
      "id": "URA-3",
      "tenantUserId": "TU-002",
      "roleId": "R-004",
      "clinicId": "CL-001",
      "branchId": "BR-001"
    },
    {
      "id": "URA-4",
      "tenantUserId": "TU-003",
      "roleId": "R-003",
      "clinicId": "CL-001",
      "branchId": "BR-001"
    },
    {
      "id": "URA-5",
      "tenantUserId": "TU-003",
      "roleId": "R-003",
      "clinicId": "CL-001",
      "branchId": "BR-002"
    },
    {
      "id": "URA-6",
      "tenantUserId": "TU-004",
      "roleId": "R-003",
      "clinicId": "CL-001",
      "branchId": "BR-002"
    },
    {
      "id": "URA-7",
      "tenantUserId": "TU-005",
      "roleId": "R-003",
      "clinicId": "CL-002",
      "branchId": "BR-003"
    },
    {
      "id": "URA-8",
      "tenantUserId": "TU-006",
      "roleId": "R-004",
      "clinicId": "CL-001",
      "branchId": null
    },
    {
      "id": "URA-9",
      "tenantUserId": "TU-007",
      "roleId": "R-003",
      "clinicId": "CL-003",
      "branchId": "BR-004"
    },
    {
      "id": "URA-10",
      "tenantUserId": "TU-008",
      "roleId": "R-003",
      "clinicId": "CL-004",
      "branchId": "BR-005"
    }
  ],
  "specialties": [
    {
      "id": "SP-001",
      "name": "طب عام"
    }
  ],
  "doctors": [
    {
      "id": "D-001",
      "userId": "U-003",
      "tenantId": "TN-001",
      "name": "د. خالد سمير",
      "licenseNumber": "EG-001239",
      "status": "active"
    },
    {
      "id": "D-002",
      "userId": "U-004",
      "tenantId": "TN-001",
      "name": "د. أحمد عادل",
      "licenseNumber": "EG-002239",
      "status": "active"
    },
    {
      "id": "D-003",
      "userId": "U-005",
      "tenantId": "TN-001",
      "name": "د. سارة محمود",
      "licenseNumber": "EG-003239",
      "status": "active"
    },
    {
      "id": "D-004",
      "userId": "U-007",
      "tenantId": "TN-002",
      "name": "د. يوسف حسن",
      "licenseNumber": "EG-004239",
      "status": "active"
    },
    {
      "id": "D-005",
      "userId": "U-008",
      "tenantId": "TN-003",
      "name": "د. هبة سالم",
      "licenseNumber": "EG-005239",
      "status": "inactive"
    }
  ],
  "doctorSpecialties": [
    {
      "tenantId": "TN-001",
      "doctorId": "D-001",
      "specialtyId": "SP-001",
      "isPrimary": true
    },
    {
      "tenantId": "TN-001",
      "doctorId": "D-002",
      "specialtyId": "SP-001",
      "isPrimary": true
    },
    {
      "tenantId": "TN-001",
      "doctorId": "D-003",
      "specialtyId": "SP-001",
      "isPrimary": true
    },
    {
      "tenantId": "TN-002",
      "doctorId": "D-004",
      "specialtyId": "SP-001",
      "isPrimary": true
    },
    {
      "tenantId": "TN-003",
      "doctorId": "D-005",
      "specialtyId": "SP-001",
      "isPrimary": true
    }
  ],
  "doctorBranches": [
    {
      "doctorId": "D-001",
      "branchId": "BR-001",
      "tenantId": "TN-001",
      "status": "active"
    },
    {
      "doctorId": "D-001",
      "branchId": "BR-002",
      "tenantId": "TN-001",
      "status": "active"
    },
    {
      "doctorId": "D-002",
      "branchId": "BR-002",
      "tenantId": "TN-001",
      "status": "active"
    },
    {
      "doctorId": "D-003",
      "branchId": "BR-003",
      "tenantId": "TN-001",
      "status": "active"
    },
    {
      "doctorId": "D-004",
      "branchId": "BR-004",
      "tenantId": "TN-002",
      "status": "active"
    },
    {
      "doctorId": "D-005",
      "branchId": "BR-005",
      "tenantId": "TN-003",
      "status": "active"
    }
  ],
  "schedules": [
    {
      "id": "SCH-1-1",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "weekday": 0,
      "start": "09:00",
      "end": "14:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-1-2",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "weekday": 2,
      "start": "09:00",
      "end": "14:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-1-3",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "weekday": 4,
      "start": "09:00",
      "end": "14:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-2-1",
      "doctorId": "D-001",
      "branchId": "BR-002",
      "weekday": 0,
      "start": "14:00",
      "end": "18:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-2-2",
      "doctorId": "D-001",
      "branchId": "BR-002",
      "weekday": 2,
      "start": "14:00",
      "end": "18:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-2-3",
      "doctorId": "D-001",
      "branchId": "BR-002",
      "weekday": 4,
      "start": "14:00",
      "end": "18:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-3-1",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "weekday": 0,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-3-2",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "weekday": 2,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-3-3",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "weekday": 4,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-4-1",
      "doctorId": "D-003",
      "branchId": "BR-003",
      "weekday": 0,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-4-2",
      "doctorId": "D-003",
      "branchId": "BR-003",
      "weekday": 2,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-4-3",
      "doctorId": "D-003",
      "branchId": "BR-003",
      "weekday": 4,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "SCH-5-1",
      "doctorId": "D-004",
      "branchId": "BR-004",
      "weekday": 0,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "SCH-5-2",
      "doctorId": "D-004",
      "branchId": "BR-004",
      "weekday": 2,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "SCH-5-3",
      "doctorId": "D-004",
      "branchId": "BR-004",
      "weekday": 4,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "SCH-6-1",
      "doctorId": "D-005",
      "branchId": "BR-005",
      "weekday": 0,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-003"
    },
    {
      "id": "SCH-6-2",
      "doctorId": "D-005",
      "branchId": "BR-005",
      "weekday": 2,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-003"
    },
    {
      "id": "SCH-6-3",
      "doctorId": "D-005",
      "branchId": "BR-005",
      "weekday": 4,
      "start": "09:00",
      "end": "16:00",
      "slot": 30,
      "status": "active",
      "tenantId": "TN-003"
    }
  ],
  "scheduleExceptions": [
    {
      "id": "EX-001",
      "tenantId": "TN-001",
      "doctorId": "D-001",
      "branchId": null,
      "startAt": "2026-11-22T09:00",
      "endAt": "2026-11-22T16:00",
      "type": "إجازة"
    },
    {
      "id": "EX-002",
      "tenantId": "TN-001",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "startAt": "2026-11-25T12:00",
      "endAt": "2026-11-25T16:00",
      "type": "استثناء ساعات العمل"
    }
  ],
  "patients": [
    {
      "id": "P-001248",
      "name": "محمد علي",
      "phone": "01012345678",
      "birthDate": "1987-01-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001247",
      "name": "سارة حسين",
      "phone": "01012345679",
      "birthDate": "1988-02-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001246",
      "name": "أحمد محمود",
      "phone": "01012345680",
      "birthDate": "1989-03-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001245",
      "name": "نور خالد",
      "phone": "01012345681",
      "birthDate": "1990-04-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001244",
      "name": "عمر مصطفى",
      "phone": "01012345682",
      "birthDate": "1991-05-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001243",
      "name": "فاطمة حسن",
      "phone": "01012345683",
      "birthDate": "1992-06-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001242",
      "name": "يوسف إبراهيم",
      "phone": "01012345684",
      "birthDate": "1993-07-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001241",
      "name": "مريم عادل",
      "phone": "01012345685",
      "birthDate": "1994-08-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001240",
      "name": "علي حسن",
      "phone": "01012345686",
      "birthDate": "1995-01-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001239",
      "name": "آية سمير",
      "phone": "01012345687",
      "birthDate": "1996-02-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001238",
      "name": "حسن أحمد",
      "phone": "01012345688",
      "birthDate": "1997-03-15",
      "gender": "ذكر",
      "address": "الجيزة، مصر",
      "status": "inactive",
      "tenantId": "TN-001"
    },
    {
      "id": "P-001237",
      "name": "سلمى ياسر",
      "phone": "01012345689",
      "birthDate": "1998-04-15",
      "gender": "أنثى",
      "address": "الجيزة، مصر",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-002001",
      "name": "ليلى جمال",
      "phone": "01123456789",
      "birthDate": "1992-04-19",
      "gender": "أنثى",
      "address": "مدينة نصر، القاهرة",
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "P-003001",
      "name": "كريم عبد الله",
      "phone": "01234567890",
      "birthDate": "1990-08-11",
      "gender": "ذكر",
      "address": "مصر الجديدة، القاهرة",
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "P-004001",
      "name": "رنا سعيد",
      "phone": "01545678901",
      "birthDate": "1998-03-21",
      "gender": "أنثى",
      "address": "الهرم، الجيزة",
      "status": "active",
      "tenantId": "TN-003"
    }
  ],
  "patientContacts": [
    {
      "id": "PC-01",
      "tenantId": "TN-001",
      "patientId": "P-001248",
      "name": "منى علي",
      "phone": "01112345678",
      "relationship": "أخت"
    }
  ],
  "patientGuardians": [
    {
      "id": "PG-01",
      "tenantId": "TN-001",
      "patientId": "P-001245",
      "guardianPatientId": "P-001248",
      "name": "محمد علي",
      "relationship": "ولي أمر"
    }
  ],
  "patientIdentifiers": [
    {
      "id": "PI-01",
      "tenantId": "TN-001",
      "patientId": "P-001248",
      "type": "معرّف داخلي",
      "value": "REG-1248"
    }
  ],
  "services": [
    {
      "id": "S-101",
      "name": "كشف عام",
      "code": "CONS-1",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "S-102",
      "name": "متابعة",
      "code": "FUP-1",
      "duration": 20,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "S-103",
      "name": "استشارة عامة",
      "code": "ADV-1",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-001"
    },
    {
      "id": "S-301",
      "name": "كشف عام",
      "code": "CONS-3",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "S-302",
      "name": "متابعة",
      "code": "FUP-3",
      "duration": 20,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "S-303",
      "name": "استشارة عامة",
      "code": "ADV-3",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-002"
    },
    {
      "id": "S-401",
      "name": "كشف عام",
      "code": "CONS-4",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-003"
    },
    {
      "id": "S-402",
      "name": "متابعة",
      "code": "FUP-4",
      "duration": 20,
      "status": "active",
      "tenantId": "TN-003"
    },
    {
      "id": "S-403",
      "name": "استشارة عامة",
      "code": "ADV-4",
      "duration": 30,
      "status": "active",
      "tenantId": "TN-003"
    }
  ],
  "servicePrices": [
    {
      "id": "PRICE-1",
      "tenantId": "TN-001",
      "serviceId": "S-101",
      "branchId": null,
      "doctorId": null,
      "price": 400,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-2",
      "tenantId": "TN-001",
      "serviceId": "S-102",
      "branchId": null,
      "doctorId": null,
      "price": 200,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-3",
      "tenantId": "TN-001",
      "serviceId": "S-103",
      "branchId": null,
      "doctorId": null,
      "price": 300,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-4",
      "tenantId": "TN-002",
      "serviceId": "S-301",
      "branchId": null,
      "doctorId": null,
      "price": 400,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-5",
      "tenantId": "TN-002",
      "serviceId": "S-302",
      "branchId": null,
      "doctorId": null,
      "price": 200,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-6",
      "tenantId": "TN-002",
      "serviceId": "S-303",
      "branchId": null,
      "doctorId": null,
      "price": 300,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-7",
      "tenantId": "TN-003",
      "serviceId": "S-401",
      "branchId": null,
      "doctorId": null,
      "price": 400,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-8",
      "tenantId": "TN-003",
      "serviceId": "S-402",
      "branchId": null,
      "doctorId": null,
      "price": 200,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-9",
      "tenantId": "TN-003",
      "serviceId": "S-403",
      "branchId": null,
      "doctorId": null,
      "price": 300,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-10",
      "tenantId": "TN-001",
      "serviceId": "S-101",
      "branchId": "BR-002",
      "doctorId": null,
      "price": 350,
      "validFrom": "2026-01-01",
      "validTo": null
    },
    {
      "id": "PRICE-11",
      "tenantId": "TN-001",
      "serviceId": "S-101",
      "branchId": "BR-001",
      "doctorId": "D-001",
      "price": 400,
      "validFrom": "2026-01-01",
      "validTo": null
    }
  ],
  "appointments": [
    {
      "id": "APT-1041",
      "patientId": "P-001248",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "09:00",
      "status": "completed",
      "source": "الهاتف",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1042",
      "patientId": "P-001247",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "serviceId": "S-102",
      "date": "2026-11-19",
      "time": "09:30",
      "status": "completed",
      "source": "الاستقبال",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1043",
      "patientId": "P-001246",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "10:00",
      "status": "progress",
      "source": "الموقع",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1044",
      "patientId": "P-001245",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-102",
      "date": "2026-11-19",
      "time": "10:30",
      "status": "checkedin",
      "source": "الهاتف",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1045",
      "patientId": "P-001244",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "11:00",
      "status": "confirmed",
      "source": "الاستقبال",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1046",
      "patientId": "P-001243",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-102",
      "date": "2026-11-19",
      "time": "11:30",
      "status": "scheduled",
      "source": "الموقع",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1047",
      "patientId": "P-001242",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "12:00",
      "status": "cancelled",
      "source": "الهاتف",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1048",
      "patientId": "P-001241",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "serviceId": "S-102",
      "date": "2026-11-19",
      "time": "12:30",
      "status": "noshow",
      "source": "الاستقبال",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1049",
      "patientId": "P-001240",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "13:00",
      "status": "confirmed",
      "source": "الموقع",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1050",
      "patientId": "P-001239",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-102",
      "date": "2026-11-19",
      "time": "13:30",
      "status": "scheduled",
      "source": "الهاتف",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1051",
      "patientId": "P-002001",
      "doctorId": "D-003",
      "branchId": "BR-003",
      "serviceId": "S-101",
      "date": "2026-11-19",
      "time": "11:00",
      "status": "confirmed",
      "source": "الاستقبال",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-2051",
      "patientId": "P-003001",
      "doctorId": "D-004",
      "branchId": "BR-004",
      "serviceId": "S-301",
      "date": "2026-11-19",
      "time": "12:00",
      "status": "confirmed",
      "source": "الهاتف",
      "tenantId": "TN-002"
    },
    {
      "id": "APT-1039",
      "patientId": "P-001248",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "serviceId": "S-101",
      "date": "2026-11-18",
      "time": "10:00",
      "status": "completed",
      "source": "الهاتف",
      "tenantId": "TN-001"
    },
    {
      "id": "APT-1052",
      "patientId": "P-001247",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "serviceId": "S-102",
      "date": "2026-11-20",
      "time": "10:30",
      "status": "scheduled",
      "source": "الاستقبال",
      "tenantId": "TN-001"
    }
  ],
  "appointmentStatusHistory": [
    {
      "id": "ASH-01",
      "tenantId": "TN-001",
      "appointmentId": "APT-1041",
      "fromStatus": null,
      "toStatus": "scheduled",
      "date": "2026-11-19",
      "time": "08:00"
    },
    {
      "id": "ASH-02",
      "tenantId": "TN-001",
      "appointmentId": "APT-1041",
      "fromStatus": "scheduled",
      "toStatus": "confirmed",
      "date": "2026-11-19",
      "time": "08:10"
    },
    {
      "id": "ASH-03",
      "tenantId": "TN-001",
      "appointmentId": "APT-1041",
      "fromStatus": "confirmed",
      "toStatus": "checkedin",
      "date": "2026-11-19",
      "time": "08:50"
    },
    {
      "id": "ASH-04",
      "tenantId": "TN-001",
      "appointmentId": "APT-1041",
      "fromStatus": "checkedin",
      "toStatus": "completed",
      "date": "2026-11-19",
      "time": "09:25"
    }
  ],
  "visits": [
    {
      "id": "V-0801",
      "appointmentId": "APT-1041",
      "patientId": "P-001248",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "checkin": "08:50",
      "start": "09:00",
      "end": "09:25",
      "status": "completed",
      "tenantId": "TN-001"
    },
    {
      "id": "V-0802",
      "appointmentId": "APT-1042",
      "patientId": "P-001247",
      "doctorId": "D-002",
      "branchId": "BR-002",
      "date": "2026-11-19",
      "checkin": "09:20",
      "start": "09:30",
      "end": "09:50",
      "status": "completed",
      "tenantId": "TN-001"
    },
    {
      "id": "V-0803",
      "appointmentId": "APT-1043",
      "patientId": "P-001246",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "checkin": "09:45",
      "start": "10:00",
      "end": null,
      "status": "progress",
      "tenantId": "TN-001"
    },
    {
      "id": "V-0804",
      "appointmentId": "APT-1044",
      "patientId": "P-001245",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "checkin": "10:10",
      "start": null,
      "end": null,
      "status": "checkedin",
      "tenantId": "TN-001"
    },
    {
      "id": "V-0805",
      "appointmentId": null,
      "patientId": "P-001238",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "checkin": "10:15",
      "start": null,
      "end": null,
      "status": "waiting",
      "tenantId": "TN-001"
    },
    {
      "id": "V-0799",
      "appointmentId": "APT-1039",
      "patientId": "P-001248",
      "doctorId": "D-001",
      "branchId": "BR-001",
      "date": "2026-11-18",
      "checkin": "09:50",
      "start": "10:00",
      "end": "10:30",
      "status": "completed",
      "tenantId": "TN-001"
    }
  ],
  "invoices": [
    {
      "id": "INV-00281",
      "visitId": "V-0801",
      "patientId": "P-001248",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "total": 600,
      "discount": 0,
      "status": "partial",
      "tenantId": "TN-001"
    },
    {
      "id": "INV-00282",
      "visitId": "V-0802",
      "patientId": "P-001247",
      "branchId": "BR-002",
      "date": "2026-11-19",
      "total": 200,
      "discount": 0,
      "status": "paid",
      "tenantId": "TN-001"
    },
    {
      "id": "INV-00283",
      "visitId": "V-0803",
      "patientId": "P-001246",
      "branchId": "BR-001",
      "date": "2026-11-19",
      "total": 400,
      "discount": 0,
      "status": "unpaid",
      "tenantId": "TN-001"
    },
    {
      "id": "INV-00279",
      "visitId": "V-0799",
      "patientId": "P-001248",
      "branchId": "BR-001",
      "date": "2026-11-18",
      "total": 400,
      "discount": 0,
      "status": "paid",
      "tenantId": "TN-001"
    }
  ],
  "invoiceItems": [
    {
      "id": "II-01",
      "invoiceId": "INV-00281",
      "serviceId": "S-101",
      "doctorId": "D-001",
      "qty": 1,
      "unitPrice": 400,
      "tenantId": "TN-001",
      "description": "كشف عام"
    },
    {
      "id": "II-02",
      "invoiceId": "INV-00281",
      "serviceId": "S-102",
      "doctorId": "D-001",
      "qty": 1,
      "unitPrice": 200,
      "tenantId": "TN-001",
      "description": "متابعة"
    },
    {
      "id": "II-03",
      "invoiceId": "INV-00282",
      "serviceId": "S-102",
      "doctorId": "D-002",
      "qty": 1,
      "unitPrice": 200,
      "tenantId": "TN-001",
      "description": "متابعة"
    },
    {
      "id": "II-04",
      "invoiceId": "INV-00283",
      "serviceId": "S-101",
      "doctorId": "D-001",
      "qty": 1,
      "unitPrice": 400,
      "tenantId": "TN-001",
      "description": "كشف عام"
    },
    {
      "id": "II-05",
      "invoiceId": "INV-00279",
      "serviceId": "S-101",
      "doctorId": "D-001",
      "qty": 1,
      "unitPrice": 400,
      "tenantId": "TN-001",
      "description": "كشف عام"
    }
  ],
  "payments": [
    {
      "id": "PAY-00451",
      "invoiceId": "INV-00281",
      "amount": 400,
      "method": "نقدي",
      "date": "2026-11-19",
      "time": "09:35",
      "status": "paid",
      "tenantId": "TN-001"
    },
    {
      "id": "PAY-00452",
      "invoiceId": "INV-00282",
      "amount": 200,
      "method": "بطاقة",
      "date": "2026-11-19",
      "time": "10:00",
      "status": "paid",
      "tenantId": "TN-001"
    },
    {
      "id": "PAY-00449",
      "invoiceId": "INV-00279",
      "amount": 400,
      "method": "محفظة",
      "date": "2026-11-18",
      "time": "10:35",
      "status": "paid",
      "tenantId": "TN-001"
    }
  ],
  "paymentRefunds": [
    {
      "id": "RF-00021",
      "tenantId": "TN-001",
      "paymentId": "PAY-00449",
      "amount": 100,
      "date": "2026-11-18",
      "status": "completed",
      "reason": "تسوية خدمة غير منفذة"
    }
  ],
  "auditLogs": [
    {
      "id": "LOG-01",
      "userId": "U-002",
      "entity": "APPOINTMENTS",
      "entityId": "APT-1044",
      "action": "update",
      "date": "2026-11-19",
      "time": "10:10",
      "text": "تسجيل وصول نور خالد",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-02",
      "userId": "U-002",
      "entity": "PAYMENTS",
      "entityId": "PAY-00452",
      "action": "create",
      "date": "2026-11-19",
      "time": "10:00",
      "text": "تسجيل دفعة للفاتورة INV-00282",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-03",
      "userId": "U-003",
      "entity": "VISITS",
      "entityId": "V-0803",
      "action": "update",
      "date": "2026-11-19",
      "time": "10:00",
      "text": "بدء زيارة أحمد محمود",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-04",
      "userId": "U-001",
      "entity": "PATIENTS",
      "entityId": "P-001248",
      "action": "view",
      "date": "2026-11-19",
      "time": "09:40",
      "text": "عرض ملف محمد علي",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-05",
      "userId": "U-002",
      "entity": "PAYMENTS",
      "entityId": "PAY-00451",
      "action": "create",
      "date": "2026-11-19",
      "time": "09:35",
      "text": "تسجيل دفعة نقدية ٤٠٠ ج.م",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-06",
      "userId": "U-005",
      "entity": "APPOINTMENTS",
      "entityId": "APT-1051",
      "action": "create",
      "date": "2026-11-19",
      "time": "09:00",
      "text": "إنشاء موعد ليلى جمال",
      "tenantId": "TN-001"
    },
    {
      "id": "LOG-07",
      "userId": "U-007",
      "entity": "APPOINTMENTS",
      "entityId": "APT-2051",
      "action": "create",
      "date": "2026-11-19",
      "time": "09:00",
      "text": "إنشاء موعد كريم عبد الله",
      "tenantId": "TN-002"
    }
  ],
  "permissions": [
    {
      "id": "patients.view",
      "group": "patients",
      "action": "view"
    },
    {
      "id": "patients.create",
      "group": "patients",
      "action": "create"
    },
    {
      "id": "patients.update",
      "group": "patients",
      "action": "update"
    },
    {
      "id": "patients.delete",
      "group": "patients",
      "action": "delete"
    },
    {
      "id": "doctors.view",
      "group": "doctors",
      "action": "view"
    },
    {
      "id": "doctors.create",
      "group": "doctors",
      "action": "create"
    },
    {
      "id": "doctors.update",
      "group": "doctors",
      "action": "update"
    },
    {
      "id": "doctors.delete",
      "group": "doctors",
      "action": "delete"
    },
    {
      "id": "appointments.view",
      "group": "appointments",
      "action": "view"
    },
    {
      "id": "appointments.create",
      "group": "appointments",
      "action": "create"
    },
    {
      "id": "appointments.update",
      "group": "appointments",
      "action": "update"
    },
    {
      "id": "appointments.delete",
      "group": "appointments",
      "action": "delete"
    },
    {
      "id": "visits.view",
      "group": "visits",
      "action": "view"
    },
    {
      "id": "visits.create",
      "group": "visits",
      "action": "create"
    },
    {
      "id": "visits.update",
      "group": "visits",
      "action": "update"
    },
    {
      "id": "visits.delete",
      "group": "visits",
      "action": "delete"
    },
    {
      "id": "billing.view",
      "group": "billing",
      "action": "view"
    },
    {
      "id": "billing.create",
      "group": "billing",
      "action": "create"
    },
    {
      "id": "billing.update",
      "group": "billing",
      "action": "update"
    },
    {
      "id": "billing.delete",
      "group": "billing",
      "action": "delete"
    },
    {
      "id": "reports.view",
      "group": "reports",
      "action": "view"
    },
    {
      "id": "reports.create",
      "group": "reports",
      "action": "create"
    },
    {
      "id": "reports.update",
      "group": "reports",
      "action": "update"
    },
    {
      "id": "reports.delete",
      "group": "reports",
      "action": "delete"
    },
    {
      "id": "settings.view",
      "group": "settings",
      "action": "view"
    },
    {
      "id": "settings.create",
      "group": "settings",
      "action": "create"
    },
    {
      "id": "settings.update",
      "group": "settings",
      "action": "update"
    },
    {
      "id": "settings.delete",
      "group": "settings",
      "action": "delete"
    },
    {
      "id": "users.view",
      "group": "users",
      "action": "view"
    },
    {
      "id": "users.create",
      "group": "users",
      "action": "create"
    },
    {
      "id": "users.update",
      "group": "users",
      "action": "update"
    },
    {
      "id": "users.delete",
      "group": "users",
      "action": "delete"
    }
  ],
  "rolePermissions": [
    {
      "roleId": "R-001",
      "permissionId": "patients.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "patients.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "patients.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "patients.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "doctors.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "doctors.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "doctors.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "doctors.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "appointments.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "appointments.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "appointments.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "appointments.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "visits.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "visits.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "visits.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "visits.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "billing.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "billing.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "billing.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "billing.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "reports.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "reports.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "reports.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "reports.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "settings.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "settings.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "settings.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "settings.delete"
    },
    {
      "roleId": "R-001",
      "permissionId": "users.view"
    },
    {
      "roleId": "R-001",
      "permissionId": "users.create"
    },
    {
      "roleId": "R-001",
      "permissionId": "users.update"
    },
    {
      "roleId": "R-001",
      "permissionId": "users.delete"
    },
    {
      "roleId": "R-002",
      "permissionId": "patients.view"
    },
    {
      "roleId": "R-002",
      "permissionId": "patients.create"
    },
    {
      "roleId": "R-002",
      "permissionId": "patients.update"
    },
    {
      "roleId": "R-002",
      "permissionId": "appointments.view"
    },
    {
      "roleId": "R-002",
      "permissionId": "appointments.create"
    },
    {
      "roleId": "R-002",
      "permissionId": "appointments.update"
    },
    {
      "roleId": "R-002",
      "permissionId": "visits.view"
    },
    {
      "roleId": "R-002",
      "permissionId": "visits.create"
    },
    {
      "roleId": "R-002",
      "permissionId": "visits.update"
    },
    {
      "roleId": "R-003",
      "permissionId": "patients.view"
    },
    {
      "roleId": "R-003",
      "permissionId": "patients.create"
    },
    {
      "roleId": "R-003",
      "permissionId": "patients.update"
    },
    {
      "roleId": "R-003",
      "permissionId": "appointments.view"
    },
    {
      "roleId": "R-003",
      "permissionId": "appointments.create"
    },
    {
      "roleId": "R-003",
      "permissionId": "appointments.update"
    },
    {
      "roleId": "R-003",
      "permissionId": "visits.view"
    },
    {
      "roleId": "R-003",
      "permissionId": "visits.create"
    },
    {
      "roleId": "R-003",
      "permissionId": "visits.update"
    },
    {
      "roleId": "R-004",
      "permissionId": "billing.view"
    },
    {
      "roleId": "R-004",
      "permissionId": "billing.create"
    },
    {
      "roleId": "R-004",
      "permissionId": "billing.update"
    },
    {
      "roleId": "R-004",
      "permissionId": "reports.view"
    },
    {
      "roleId": "R-004",
      "permissionId": "reports.create"
    },
    {
      "roleId": "R-004",
      "permissionId": "reports.update"
    }
  ],
  "permissionGroups": {
    "patients": "المرضى",
    "doctors": "الأطباء",
    "appointments": "المواعيد",
    "visits": "الزيارات",
    "billing": "الفواتير والمدفوعات",
    "reports": "التقارير",
    "settings": "الإعدادات",
    "users": "المستخدمون"
  }
};
export default data;
