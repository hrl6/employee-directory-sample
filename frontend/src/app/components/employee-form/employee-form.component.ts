import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-employee-form',
  standalone: false,

  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  departments: Department[] = [];
  isEditMode = false;
  employeeId?: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      hire_date: ['', Validators.required],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  loadDepartments(): void {
    this.employeeService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id)
      .subscribe(employee => {
        this.employeeForm.patchValue(employee);
      });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
          .subscribe(() => this.router.navigate(['/employees']));
      } else {
        this.employeeService.createEmployee(this.employeeForm.value)
          .subscribe(() => this.router.navigate(['/employees']));
      }
    }
  }
}