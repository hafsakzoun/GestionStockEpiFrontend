import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { RequestFormComponent } from 'src/app/user/request-form/request-form.component';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit{

  epis:any[]= [];
  

  displayedColumns: string[] = [
    'id',
    'cost_centre',
    'name',
    'TEID',
    'Department',
    'ppe_label',
    'ppe_size',
    'RequestedQt',
    'createdDate',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, 
    private _dialog: MatDialog,
    private _coreService: CoreService ) {}

  openRequestForm()
  {
    const dialogRef = this._dialog.open(RequestFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRequests();
        }
      },
    });
  }

  ngOnInit(): void {
    this.getRequests();
  }
  getRequests() {
    this.http.get("http://127.0.0.1:8000/api/Requests").subscribe({
      next: (res: any) => {
        const formattedData = res.map((item: any) => ({
          ...item,
        }));
        this.dataSource = new MatTableDataSource(formattedData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
