// Confirm Dialog Component - reusable confirmation dialog
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  details?: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div style="padding: 20px;">
      <!-- Dialog Header -->
      <h2 mat-dialog-title style="color: #f44336; margin: 0 0 20px 0;">
        <mat-icon style="vertical-align: middle; margin-right: 10px;">warning</mat-icon>
        {{ data.title }}
      </h2>

      <!-- Dialog Content -->
      <mat-dialog-content style="margin-bottom: 20px;">
        <p style="font-size: 16px; margin-bottom: 15px;">{{ data.message }}</p>
        <p *ngIf="data.details" style="color: #666; font-size: 14px;">{{ data.details }}</p>
      </mat-dialog-content>

      <!-- Dialog Actions -->
      <mat-dialog-actions style="justify-content: flex-end; gap: 10px; margin: 0; padding: 0;">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText }}
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          {{ data.confirmText }}
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  // User clicked Cancel
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // User clicked Confirm
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}