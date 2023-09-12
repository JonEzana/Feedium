"""empty message

Revision ID: db71ecb4496e
Revises: 04ecb9f69f6d
Create Date: 2023-09-11 19:06:55.232829

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'db71ecb4496e'
down_revision = '04ecb9f69f6d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url_1', sa.String(length=500), nullable=True))
        batch_op.add_column(sa.Column('image_url_2', sa.String(length=500), nullable=True))
        batch_op.add_column(sa.Column('image_url_3', sa.String(length=500), nullable=True))
        batch_op.add_column(sa.Column('image_url_4', sa.String(length=500), nullable=True))

    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE topics SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE stories SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE snaps SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE story_topics SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stories', schema=None) as batch_op:
        batch_op.drop_column('image_url_4')
        batch_op.drop_column('image_url_3')
        batch_op.drop_column('image_url_2')
        batch_op.drop_column('image_url_1')

    # ### end Alembic commands ###
