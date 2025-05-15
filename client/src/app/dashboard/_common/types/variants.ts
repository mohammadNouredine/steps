export interface DashboardVariant extends CreateDashboardVariant {
  id: number;
  variantOptions: DashboardVariantOption[];
}
export type CreateDashboardVariant = {
  name: string;
  variantOptions: CreateVariantOption[];
};
export interface UpdateDashboardVariant
  extends Partial<CreateDashboardVariant> {}

export interface DashboardVariantOption extends CreateVariantOption {
  id: number;
}
interface CreateVariantOption {
  name: string;
  value: string;
}
