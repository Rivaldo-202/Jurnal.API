Cara Runing
1.npm i
2.npm run dev

## Pastikan muncul pemberitahuan MongoDB Atlas Conected 

============ ## Warehouse Transfer ## ==============
## 1.Add WarehouseTransfer To Database
http://localhost:3000/api/v1/warehouse_transfers --> POST
Body Json Example :

{
  "warehouse_transfer": {
    "from_warehouse_name": "Warehouse Barlu",
    "from_warehouse_code": "wb",
    "to_warehouse_name": "Warehouse Lama",
    "to_warehouse_code": "wl",
    "memo": "dari postman bor",
    "transaction_no": "1001",
    "transaction_date": "03/06/2016",
    "warehouse_transfer_lines_attributes": [
      {
        "product_name": "LEGO HERO 6",
        "product_code": "LH6",
        "quantity": 20
      }
    ]
  }
}

## 2. Get Data Warehouse Transfer By Id
http://localhost:3000/api/v1/warehouse_transfers/68095fa29ee896c7f33c5a6f --> GET
-->pastikan mengambil id yang sudah ada di database mongodb atlas

## 3. Add Comment To Warehouse Transfer By Transaction_no
http://localhost:3000/api/v1/warehouse_transfers/1001/comments --> POST
-->pastikan mengambil Transaction_no yang sudah ada di database mongodb atlas
Body Json Example :
{
  "comment": {
    "notes": "This is a new comment added via Postman New Comment"
  }
}

## 4. Get Data Comment Warehouse Transfer By Transaction_no
http://localhost:3000/api/v1/warehouse_transfers/1001/comments --> GET
--> Pastikan Transactiono_no Mengambil dari database yang sudah ada 

## 5.Get All Data Warehouse Transfer
http://localhost:3000/api/v1/warehouse_transfers --> Get

## 6.Update data Warehouse By id warehouse
http://localhost:3000/api/v1/warehouse_transfers/1001 --> PATCH
Body Json Example :
{
  "warehouse_transfer": {
    "from_warehouse_name": "Warehouse Sanhok Updated",
    "to_warehouse_name": "Warehouse Lama Updated",
    "memo": "Updated memo from Postman",
    "transaction_date": "2025-04-23",
    "warehouse_transfer_lines_attributes": [
      {
        "id": "68095fa29ee896c7f33c5a73",  // ID produk yang ingin diperbarui
        "product_name": "LEGO HERO 7 Super Update",  // Nama produk yang diperbarui
        "quantity": 30,  // Jumlah produk yang diperbarui
        "product": {
          "name": "LEGO HERO 7 try Update",
          "code": "LH7"  // Pastikan product.code ada
        }
      }
      
    ]
  }
}

======================= ## TAX ## ========================
## 7.Add Tax with Witholding
http://localhost:3000/api/v1/taxes --> POST
Body Json Example :
{
  "tax": {
    "name": "Pajak Sarana Witholding",
    "rate": 5,
    "is_witholding": true,
    "sell_tax_account_name": "Sarana Kantor Terhutang",
    "buy_tax_account_name": "Aset Lancar Lainnya"
  }
}

## 8.Get a Single Tax By Id
http://localhost:3000/api/v1/taxes/6809becdcb2d5bb7286a02a4 --> GET
--> Pastikan id yang di ambil benar dan mengambil dari database mongoDB atlas

## 9.Update Data Tax By id
http://localhost:3000/api/v1/taxes/6809becdcb2d5bb7286a02a4 --> PATCH
Body Json Example :
{
  "tax": {
    "name": "PPN Updated New",
    "rate": 10,
    "is_compound": true,
    "sell_tax_account_name": "Sales Tax Updated Data New",
    "buy_tax_account_name": "Purchase Tax Updated Data New",
    "custom_id": "TaxUpdated"
  }
}

## 10.Delete Data Tax By id
http://localhost:3000/api/v1/taxes/6809becdcb2d5bb7286a02a4 --> DELETE
--> Pastikan id yang digunakan benar







