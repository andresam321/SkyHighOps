"""creating tables

Revision ID: 413a5ba054f1
Revises: 
Create Date: 2025-01-09 18:17:55.858496

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '413a5ba054f1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('airport_area',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('area_name', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('area_name')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.String(length=55), nullable=True),
    sa.Column('firstname', sa.String(length=40), nullable=False),
    sa.Column('lastname', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('employee_id')
    )
    op.create_table('fuel_pricing',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('fuel_price', sa.String(length=25), nullable=False),
    sa.Column('type_of_fuel', sa.String(length=25), nullable=False),
    sa.Column('date_of_pricing', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fuel_tank',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_by_user_id', sa.Integer(), nullable=False),
    sa.Column('tank_name', sa.String(), nullable=False),
    sa.Column('fuel_type', sa.String(), nullable=False),
    sa.Column('fuel_capacity', sa.Float(), nullable=False),
    sa.Column('usable_fuel', sa.Float(), nullable=False),
    sa.Column('threshold_level', sa.Float(), nullable=False),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('last_inspection_date', sa.Date(), nullable=False),
    sa.Column('next_inspection_due', sa.Date(), nullable=False),
    sa.Column('maintenance_status', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('parking_spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('airport_area_id', sa.Integer(), nullable=False),
    sa.Column('spot_number', sa.String(length=50), nullable=False),
    sa.Column('spot_size', sa.String(length=50), nullable=False),
    sa.Column('is_reserved', sa.String(length=10), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['airport_area_id'], ['airport_area.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aircrafts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('parking_spot_id', sa.Integer(), nullable=True),
    sa.Column('plane_image', sa.String(), nullable=False),
    sa.Column('tail_number', sa.String(length=10), nullable=False),
    sa.Column('manufacturer', sa.String(length=255), nullable=True),
    sa.Column('model', sa.String(length=255), nullable=True),
    sa.Column('max_takeoff_weight', sa.String(length=50), nullable=True),
    sa.Column('seating_capacity', sa.String(length=50), nullable=True),
    sa.Column('operation_status', sa.String(length=50), nullable=False),
    sa.Column('fuel_type', sa.String(length=50), nullable=False),
    sa.Column('active_owners', sa.String(length=10), nullable=False),
    sa.Column('notes', sa.String(length=255), nullable=True),
    sa.Column('last_time_fueled', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['parking_spot_id'], ['parking_spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fuel_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aircraft_id', sa.Integer(), nullable=False),
    sa.Column('completed_by_user_id', sa.Integer(), nullable=True),
    sa.Column('created_by_user_id', sa.Integer(), nullable=True),
    sa.Column('parking_spot_id', sa.Integer(), nullable=True),
    sa.Column('fuel_type', sa.String(length=25), nullable=True),
    sa.Column('request_by', sa.String(length=25), nullable=False),
    sa.Column('positive_prist', sa.String(length=10), nullable=False),
    sa.Column('quantity', sa.String(length=255), nullable=False),
    sa.Column('paid', sa.String(length=55), nullable=False),
    sa.Column('service_date_deadline_by', sa.String(length=25), nullable=False),
    sa.Column('service_time_deadline_by', sa.String(length=25), nullable=False),
    sa.Column('is_completed', sa.String(length=25), nullable=True),
    sa.Column('order_date', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['aircraft_id'], ['aircrafts.id'], ),
    sa.ForeignKeyConstraint(['completed_by_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['parking_spot_id'], ['parking_spots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('owners',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_by_user_id', sa.Integer(), nullable=False),
    sa.Column('aircraft_id', sa.Integer(), nullable=True),
    sa.Column('firstname', sa.String(length=25), nullable=False),
    sa.Column('lastname', sa.String(length=25), nullable=False),
    sa.Column('username', sa.String(length=25), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('address', sa.String(length=40), nullable=False),
    sa.Column('phone_number', sa.String(length=15), nullable=False),
    sa.Column('payment_type', sa.String(length=40), nullable=False),
    sa.Column('notes', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['aircraft_id'], ['aircrafts.id'], ),
    sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('parking_histories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aircraft_id', sa.Integer(), nullable=False),
    sa.Column('parking_spot_id', sa.Integer(), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['aircraft_id'], ['aircrafts.id'], ),
    sa.ForeignKeyConstraint(['parking_spot_id'], ['parking_spots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('parking_histories')
    op.drop_table('owners')
    op.drop_table('fuel_orders')
    op.drop_table('aircrafts')
    op.drop_table('parking_spots')
    op.drop_table('fuel_tank')
    op.drop_table('fuel_pricing')
    op.drop_table('users')
    op.drop_table('role')
    op.drop_table('airport_area')
    # ### end Alembic commands ###